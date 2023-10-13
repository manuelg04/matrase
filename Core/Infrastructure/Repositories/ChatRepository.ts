/* eslint-disable @typescript-eslint/naming-convention */
import { Inject, Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import { type IChatRepository } from '../../Domain/Repositories/IChatRepository';
import ChatModel from '../Database/Models/chatsModel';
import UsersModel from '../Database/Models/UserModels';
import NoveltiesModel from '../Database/Models/noveltiesModel';
import MessageFilesModel from '../Database/Models/messageFilesModel';
import AreasModel from '../Database/Models/areasModel';
import MessageModel from '../Database/Models/messageModel';
import AdminChatModel from '../Database/Models/adminChatModel';

@Service()
export class ChatRepository implements IChatRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {}

  async createChat(
    users_id: number,
    reference_id: number | null = null,
    type: 'novelty' | 'help' = 'novelty'
  ): Promise<any> {
    const chatRepo = this.sequelize.getRepository(ChatModel);
    const messageRepo = this.sequelize.getRepository(MessageModel);
    const messageFileRepo = this.sequelize.getRepository(MessageFilesModel);

    // Construye el chat
    const chatInstance = await chatRepo.create({
      users_id,
      novelties_id: type === 'novelty' ? reference_id : null,
      help_id: type === 'help' ? reference_id : null
    } as any);

    // Crea un mensaje inicial (esto puede variar según si es una novedad o una ayuda)
    const initialMessageText =
      type === 'novelty'
        ? 'Has creado una novedad inicial.'
        : 'Has solicitado ayuda en línea.';

    // Creamos un mensaje inicial
    const initialMessage = await messageRepo.create({
      messages: initialMessageText,
      send_at: new Date(),
      status: 1,
      chats_id: chatInstance.id,
      sender_type: 'Admin',
      sender_id: 1
    });

    const data: Partial<MessageFilesModel> = {
      path: 'ruta/del/archivo.jpg',
      mime_type: 'image/jpeg',
      message_id: initialMessage.id
    };
    const newFile = await messageFileRepo.create(data as any);

    // recuperamos el chat recién creado junto con toda la información relacionada
    const chatWithDetails = await chatRepo.findByPk(
      chatInstance.dataValues.id,
      {
        include: [
          {
            model: NoveltiesModel,
            as: 'novelty',
            include: [{ model: AreasModel, as: 'area' }]
          },
          { model: UsersModel, as: 'user' },
          {
            model: MessageModel,
            as: 'messages',
            include: [{ model: MessageFilesModel, as: 'files' }]
          }
        ]
      }
    );

    return { chat: chatWithDetails, initialMessage, newFile };
  }

  async getChatById(id: number): Promise<object> {
    const chatRepo = this.sequelize.getRepository(ChatModel);
    return await chatRepo.findByPk(id, {
      include: [
        {
          model: NoveltiesModel,
          as: 'novelty',
          include: [{ model: AreasModel, as: 'area' }]
        },
        { model: UsersModel, as: 'user' },
        {
          model: MessageModel,
          as: 'messages',
          include: [{ model: MessageFilesModel, as: 'files' }]
        }
      ]
    });
  }

  async getChatWithMessagesAndFilesById(id: number): Promise<object> {
    const chatRepo = this.sequelize.getRepository(ChatModel);
    return await chatRepo.findOne({
      where: { id },
      attributes: ['id'],
      include: [
        {
          model: NoveltiesModel,
          as: 'novelty',
          attributes: ['name', 'description', 'image_path'],
          include: [
            {
              model: AreasModel,
              as: 'area',
              attributes: ['name']
            }
          ]
        },
        {
          model: UsersModel,
          as: 'user',
          attributes: ['id', 'type_user', 'name']
        },
        {
          model: MessageModel,
          as: 'messages',
          attributes: [
            'messages',
            'send_at',
            'status',
            'sender_type',
            'sender_id'
          ],
          include: [
            {
              model: MessageFilesModel,
              as: 'files',
              attributes: ['path']
            }
          ]
        }
      ]
    });
  }

  async getChatsByAdminId(adminId: number): Promise<object[]> {
    const chatRepo = this.sequelize.getRepository(ChatModel);
    return await chatRepo.findAll({
      include: [
        {
          model: AdminChatModel, // Asume que tienes una relación en ChatModel para AdminChatModel
          where: { users_id: adminId }, // Filtra por el adminId
          attributes: [] // No necesitas detalles específicos de esta relación
        },
        { model: UsersModel, as: 'user' }, // Información del usuario que inició el chat
        {
          model: MessageModel,
          as: 'messages',
          limit: 1,
          order: [['send_at', 'DESC']], // Solo el último mensaje enviado
          attributes: ['messages', 'send_at']
        }
      ]
    });
  }
}

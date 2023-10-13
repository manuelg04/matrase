import { type Message } from './../../Domain/Interfaces/MessageResponse';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Service, Container } from 'typedi';
import { type Request, type Response } from 'express';
import { ChatRepository } from '../Repositories/ChatRepository';
import { MessageRepository } from '../Repositories/MessageRepository';
import { CreateChatCommand } from '../../Application/Commands/Chats/CreateChatCommand';
import { type CreateChatHandler } from '../../Application/Commands/Chats/CreateChatHandler';
import { MessageFilesRepository } from '../Repositories/MessageFilesRepository';
import { AdminChatRepository } from '../Repositories/AdminChatRepository';
import Mensaje from '../Database/Models/messageModel';
import { type Message } from '../../Domain/Interfaces/MessageResponse';

@Service()
export class ChatController {
  constructor(
    private readonly chatRepo: ChatRepository,
    private readonly messageRepo: MessageRepository,
    private readonly adminChatRepo: AdminChatRepository,
    private readonly messageFilesRepo: MessageFilesRepository
  ) {}

  // Crear un nuevo chat
  public async createChat(req: Request, res: Response): Promise<void> {
    try {
      const { users_id, novelties_id } = req.body;
      // Asumiendo que 'users_id' y 'novelties_id' se envían en el cuerpo de la petición

      if (!users_id || !novelties_id) {
        // Verificamos que ambos IDs están presentes
        res
          .status(400)
          .json({ error: 'Se requieren los IDs de usuario y novedad.' });
        return;
      }

      // Si usas un comando y un manejador, asegúrate de que esos también estén configurados para aceptar
      // y manejar el 'novelties_id'. Por ahora, supondré que el repositorio ChatRepository se encarga de la creación.
      const newChat = await this.chatRepo.createChat(users_id, novelties_id);

      res.status(201).json(newChat);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener mensajes por ID de chat
  public async getMessagesByChatId(req: Request, res: Response): Promise<void> {
    try {
      const idChat = parseInt(req.params.id, 10);
      const messages = await this.messageRepo.getMessagesByChatId(idChat);
      res.status(200).json(messages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Enviar un mensaje al chat
  public async sendChatMessage(req: Request, res: Response): Promise<void> {
    try {
      const { sender_id, messages, sender_type, send_at } = req.body;
      const id = parseInt(req.params.id, 10);
      const newMessage = await this.messageRepo.createMessage(
        id,
        sender_id,
        messages,
        sender_type,
        '1', // asumiendo que "1" es un estado válido y que es una cadena
        send_at
      );
      res.status(201).json(newMessage);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getChatsForAdmin(req: Request, res: Response): Promise<void> {
    try {
      const adminId = req.body.adminId;

      if (!adminId) {
        res.status(400).send({ error: 'Admin ID is required.' });
        return;
      }

      const chats = await this.chatRepo.getChatsByAdminId(adminId);
      res.status(200).json(chats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getChatDetails(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de chat inválido.' });
        return;
      }

      const chatDetails: any =
        await this.chatRepo.getChatWithMessagesAndFilesById(id);

      if (!chatDetails.user) {
        res
          .status(500)
          .json({ error: 'El chat no tiene un usuario asociado.' });
        return;
      }

      const messages = await this.messageRepo.getMessagesByChatId(id);
      const adminRelation: any = await this.adminChatRepo.getAdminChatById(id);
      const admin = adminRelation ? adminRelation.user : null;

      for (const message of messages) {
        const filesFromDb = await this.messageFilesRepo.getFilesByMessageId(
          (message as Message).id
        );
        (message as Message).files = filesFromDb.map((file) => ({
          id: file.id,
          path: file.path,
          mime_type: file.mime_type,
          message_id: file.message_id,
          message: file.message ? file.message.messages : null
        }));
      }

      res.status(200).json({
        [id]: {
          novelty: {
            ...chatDetails.novelty?.get(),
            area: chatDetails.novelty?.area
          },
          user: {
            id: chatDetails.user.id,
            type: chatDetails.user.type_user,
            name: chatDetails.user.name
          },
          admins: admin
            ? [
                {
                  id: admin.id,
                  status: adminRelation.status, // Usando el campo 'status' del modelo
                  name: admin.name
                }
              ]
            : [],
          messages: (messages as Message[]).map((msg) => ({
            message: msg.messages,
            datetime: msg.send_at,
            status: msg.status === 0 ? 'pending' : 'readed',
            files: msg.files?.map((file) => file.path) || [],
            user_type: msg.sender_type,
            sender: msg.sender_id
          }))
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

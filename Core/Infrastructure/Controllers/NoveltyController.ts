/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { MessageFilesRepository } from './../Repositories/MessageFilesRepository';
import { NoveltyRepository } from './../Repositories/NoveltyRepository';
import { Service } from 'typedi';
import { type Request, type Response } from 'express';
import { ChatRepository } from '../Repositories/ChatRepository';
import { AdminChatRepository } from '../Repositories/AdminChatRepository';
import AreasModel from '../Database/Models/areasModel';

@Service()
export class NoveltyController {
  constructor(
    private readonly noveltyRepo: NoveltyRepository,
    private readonly chatRepo: ChatRepository,
    private readonly messageFilesRepo: MessageFilesRepository,
    private readonly adminChatRepo: AdminChatRepository
  ) {}

  async createNovelty(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, image_path, area_id } = req.body;

      if (!name || !description || !image_path || !area_id) {
        res.status(400).send({ message: 'Información incompleta' });
        return;
      }

      const novelty = await this.noveltyRepo.createNovelty({
        name,
        description,
        image_path,
        area_id
      });

      const area = await AreasModel.findByPk(area_id);
      if (!area) {
        res.status(400).send({ message: 'Área no encontrada.' });
        return;
      }
      const areaName = area.name;

      const admin = await this.adminChatRepo.getFirstAdminForArea(areaName);
      if (!admin) {
        throw new Error('No hay administradores disponibles para esta área.');
      }

      const userId = 1; // Aquí debes obtener el userId real del usuario que está creando la novedad

      const result = await this.chatRepo.createChat(userId, novelty.id);
      const chat = result.chat;
      const initialMessage = result.initialMessage; // Aquí obtienes el mensaje inicial

      if (!chat || !chat.id) {
        res.status(500).send({ message: 'Error al crear el chat' });
        return;
      }
      const adminChatData = {
        chats_id: chat.id,
        users_id: admin.id
      };
      await this.adminChatRepo.createAdminChat(adminChatData);

      // Suponiendo que tu chat ya tiene un mensaje inicial creado, obtenemos ese ID de mensaje
      const messageId = initialMessage.id; // Asumiendo que tu chat tiene un atributo initialMessageId

      // Crear una instancia del archivo del mensaje
      const messageFile = await this.messageFilesRepo.createFile({
        path: 'path/to/image',
        mime_type: 'image/jpeg', // En el futuro, obtén el MIME type real
        message_id: messageId
      });

      if (!messageFile || !messageFile.id) {
        res
          .status(500)
          .send({ message: 'Error al crear el archivo del mensaje' });
        return;
      }

      res.status(201).send({ novelty, chat });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Error al crear la novedad', error: error.message });
    }
  }
}

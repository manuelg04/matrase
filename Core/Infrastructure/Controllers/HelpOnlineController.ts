/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { Service } from 'typedi';
import { type Request, type Response } from 'express';
import { ChatRepository } from '../Repositories/ChatRepository';
import { AdminChatRepository } from '../Repositories/AdminChatRepository';
import { HelpOnlineRepository } from '../Repositories/HelpOnlineRepository';

@Service()
export class HelpOnlineController {
  constructor(
    private readonly chatRepo: ChatRepository,
    private readonly adminChatRepo: AdminChatRepository,
    private readonly helpOnlineRepo: HelpOnlineRepository
  ) {}

  async createHelpOnline(req: Request, res: Response): Promise<void> {
    try {
      const { userId, help_type } = req.body;

      const helpTypeToAreaMap: Record<string, string> = {
        'Actualización de documentos': 'Asociados de Negocio',
        Operaciones: 'Operaciones',
        Pagos: 'Legalizaciones',
        'Control de tráfico': 'Control de tráfico'
      };

      const areaName = helpTypeToAreaMap[help_type];
      const admin = await this.adminChatRepo.getFirstAdminForArea(areaName);

      if (!admin) {
        throw new Error('No hay administradores disponibles para esta área.');
      }

      // Crear chat para el usuario
      const result = await this.chatRepo.createChat(userId, null);
      const newChat = result.chat;

      if (!newChat || !newChat.id) {
        res.status(500).send({ message: 'Error al crear el chat' });
        return;
      }

      // Crear solicitud de ayuda
      const helpOnline = await this.helpOnlineRepo.createHelpOnline(
        userId,
        help_type,
        newChat.id
      );
      if (!helpOnline) {
        throw new Error('Error al crear la solicitud de ayuda.');
      }

      const adminChatData = {
        chats_id: newChat.id,
        users_id: admin.id
      };

      await this.adminChatRepo.createAdminChat(adminChatData);

      res.status(201).json(helpOnline);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Otros métodos relevantes (listar solicitudes de ayuda, eliminar, etc.) si es necesario
}

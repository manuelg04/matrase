/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Inject, Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import { type IAdminChatRepository } from '../../Domain/Repositories/IAdminChatRepository';
import AdminChatModel from '../Database/Models/adminChatModel';
import type ChatModel from '../Database/Models/chatsModel';
import UsersModel from '../Database/Models/UserModels';
import AreasModel from '../Database/Models/areasModel';

@Service()
export class AdminChatRepository implements IAdminChatRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {}

  async createAdminChat(data: {
    chats_id: number;
    users_id: number;
  }): Promise<object> {
    const adminChatRepo = this.sequelize.getRepository(AdminChatModel);
    return await adminChatRepo.create(data as any);
  }

  async getAdminChatById(id: number): Promise<object | null> {
    const adminChatRepo = this.sequelize.getRepository(AdminChatModel);
    return await adminChatRepo.findByPk(id);
  }

  async deleteAdminChat(id: number): Promise<boolean> {
    const adminChatRepo = this.sequelize.getRepository(AdminChatModel);
    const result = await adminChatRepo.destroy({ where: { id } });
    return result > 0;
  }

  async getAdminByChatId(id: number): Promise<UsersModel | null> {
    const adminChatRepo = this.sequelize.getRepository(AdminChatModel);
    const adminChat = await adminChatRepo.findOne({
      where: { id },
      include: [{ model: UsersModel, as: 'user' }]
    });

    return adminChat != null ? adminChat.user : null;
  }

  async getFirstAdminForArea(areaName: string): Promise<UsersModel | null> {
    if (!areaName) {
      throw new Error('Nombre de área no válido.');
    }

    // Obtener el ID del área basándose en el nombre
    const area = await this.sequelize
      .getRepository(AreasModel)
      .findOne({ where: { name: areaName } });

    if (!area) {
      return null;
    }

    // Buscar el primer administrador relacionado con esa área
    const admin = await UsersModel.findOne({
      include: [
        {
          model: AreasModel,
          where: { id: area.id },
          through: {
            attributes: [] // Esto excluirá los atributos del modelo intermedio AreasHasUsersModel
          }
        }
      ]
    });

    return admin;
  }
}

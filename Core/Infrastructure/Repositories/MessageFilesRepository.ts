/* eslint-disable @typescript-eslint/naming-convention */
import { Inject, Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import { type IMessageFilesRepository } from '../../Domain/Repositories/IMessageFilesRepository';
import MessageFilesModel from '../Database/Models/messageFilesModel';

@Service()
export class MessageFilesRepository implements IMessageFilesRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {}

  async createFile(
    data: Partial<MessageFilesModel>
  ): Promise<MessageFilesModel> {
    const filesRepo = this.sequelize.getRepository(MessageFilesModel);
    return await filesRepo.create(data as any);
  }

  async getFileById(id: number): Promise<MessageFilesModel | null> {
    const filesRepo = this.sequelize.getRepository(MessageFilesModel);
    return await filesRepo.findByPk(id);
  }

  async deleteFile(id: number): Promise<boolean> {
    const filesRepo = this.sequelize.getRepository(MessageFilesModel);
    const result = await filesRepo.destroy({ where: { id } });
    return result > 0;
  }

  async getFilesByMessageId(message_id: number): Promise<MessageFilesModel[]> {
    const filesRepo = this.sequelize.getRepository(MessageFilesModel);
    return await filesRepo.findAll({
      where: { message_id }
    });
  }
}

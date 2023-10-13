/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type IHelpOnlineRepository } from '../../Domain/Repositories/IHelpOnlineRepository';
import { Service, Inject } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import HelpOnlineModel from '../Database/Models/helpOnlineModel';

@Service()
export class HelpOnlineRepository implements IHelpOnlineRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async createHelpOnline(
    userId: number,
    help_type: string,
    chatId: number
  ): Promise<any> {
    try {
      const helpOnlineRepo = this.sequelize.getRepository(HelpOnlineModel);
      const newHelpRequest = await helpOnlineRepo.create({
        user_id: userId,
        help_type,
        chat_id: chatId
      });

      if (newHelpRequest) {
        return {
          id: newHelpRequest.id,
          user_id: newHelpRequest.user_id,
          help_type: newHelpRequest.help_type,
          chat_id: newHelpRequest.chat_id
        };
      } else {
        throw new Error('Error al crear la solicitud de ayuda.');
      }
    } catch (error) {
      throw new Error('Error al crear la solicitud de ayuda: ' + error.message);
    }
  }

  async getHelpRequestById(id: number): Promise<any> {
    try {
      const helpOnlineRepo = this.sequelize.getRepository(HelpOnlineModel);
      const helpRequest = await helpOnlineRepo.findByPk(id);
      if (!helpRequest)
        throw new Error('La solicitud de ayuda enlinea no fue encontrada.');
      return helpRequest;
    } catch (error) {
      throw error;
    }
  }

  async getAllHelpRequests(): Promise<any[]> {
    try {
      const helpOnlineRepo = this.sequelize.getRepository(HelpOnlineModel);
      return await helpOnlineRepo.findAll();
    } catch (error) {
      throw error;
    }
  }
}

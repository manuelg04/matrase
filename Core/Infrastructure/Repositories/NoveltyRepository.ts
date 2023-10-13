import { Inject, Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import { type INoveltyRepository } from '../../Domain/Repositories/INoveltiesRepository';
import NoveltiesModel from '../Database/Models/noveltiesModel';

@Service()
export class NoveltyRepository implements INoveltyRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {}

  async createNovelty(data: Partial<NoveltiesModel>): Promise<NoveltiesModel> {
    const noveltyRepo = this.sequelize.getRepository(NoveltiesModel);
    return await noveltyRepo.create(data as any);
  }

  async getNoveltyById(id: number): Promise<NoveltiesModel | null> {
    const noveltyRepo = this.sequelize.getRepository(NoveltiesModel);
    return await noveltyRepo.findByPk(id);
  }

  async updateNovelty(
    id: number,
    data: Partial<NoveltiesModel>
  ): Promise<NoveltiesModel | null> {
    const noveltyRepo = this.sequelize.getRepository(NoveltiesModel);
    await noveltyRepo.update(data, { where: { id } });
    return await noveltyRepo.findByPk(id);
  }

  async deleteNovelty(id: number): Promise<boolean> {
    const noveltyRepo = this.sequelize.getRepository(NoveltiesModel);
    const result = await noveltyRepo.destroy({ where: { id } });
    return result > 0;
  }
}

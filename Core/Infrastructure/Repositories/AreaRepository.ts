import { Inject, Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import { type IAreaRepository } from '../../Domain/Repositories/IAreasRepository';
import AreasModel from '../Database/Models/areasModel';
import NoveltiesModel from '../Database/Models/noveltiesModel';

@Service()
export class AreaRepository implements IAreaRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {}

  async createArea(data: { name: string }): Promise<AreasModel> {
    const areaRepo = this.sequelize.getRepository(AreasModel);
    return await areaRepo.create(data as any);
  }

  async getAreaById(id: number): Promise<AreasModel | null> {
    const areaRepo = this.sequelize.getRepository(AreasModel);
    return await areaRepo.findByPk(id);
  }

  async updateArea(
    id: number,
    data: { name?: string }
  ): Promise<AreasModel | null> {
    const areaRepo = this.sequelize.getRepository(AreasModel);
    await areaRepo.update(data, { where: { id } });
    return await areaRepo.findByPk(id);
  }

  async deleteArea(id: number): Promise<boolean> {
    const areaRepo = this.sequelize.getRepository(AreasModel);
    const result = await areaRepo.destroy({ where: { id } });
    return result > 0;
  }

  async getAreasWithNovelties(): Promise<AreasModel[]> {
    const areaRepo = this.sequelize.getRepository(AreasModel);
    return await areaRepo.findAll({ include: [{ model: NoveltiesModel }] }); // Asumiendo que tienes la relación definida en sequelize.
  }
}

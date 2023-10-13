import type NoveltiesModel from '../../Infrastructure/Database/Models/noveltiesModel';

export interface INoveltyRepository {
  createNovelty: (data: Partial<NoveltiesModel>) => Promise<NoveltiesModel>;
  getNoveltyById: (id: number) => Promise<NoveltiesModel | null>;
  updateNovelty: (
    id: number,
    data: Partial<NoveltiesModel>
  ) => Promise<NoveltiesModel | null>;
  deleteNovelty: (id: number) => Promise<boolean>;
}

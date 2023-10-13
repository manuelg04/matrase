import type AreasModel from '../../Infrastructure/Database/Models/areasModel';

export interface IAreaRepository {
  createArea: (data: { name: string }) => Promise<AreasModel>;
  getAreaById: (id: number) => Promise<AreasModel | null>;
  updateArea: (
    id: number,
    data: { name?: string }
  ) => Promise<AreasModel | null>;
  deleteArea: (id: number) => Promise<boolean>;
  getAreasWithNovelties: () => Promise<AreasModel[]>; // Para obtener áreas con sus respectivas novedades
}

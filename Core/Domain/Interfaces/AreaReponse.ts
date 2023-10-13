import { type Novelty } from './NoveltyResponse';

export interface Area {
  name: string;
  novelties?: Novelty[]; // Añadiré esto por la relación HasMany con NoveltiesModel.
}

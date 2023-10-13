import { type Area } from './AreaReponse';

export interface Novelty {
  name: string;
  description: string;
  image_path?: string;
  area_id: number;
  area?: Area; // Añadiré esto por la relación BelongsTo con AreasModel.
}

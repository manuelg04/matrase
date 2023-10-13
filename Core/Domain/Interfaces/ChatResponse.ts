import { type Message } from './MessageResponse';
import { type Novelty } from './NoveltyResponse';
import { type User } from './UserResponse';

export interface Chat {
  users_id: number;
  novelties_id: number;
  messages?: Message[]; // relación HasMany con MessageModel.
  user?: User; // relación BelongsTo con UsersModel.
  novelty?: Novelty; // relación BelongsTo con NoveltiesModel.
}

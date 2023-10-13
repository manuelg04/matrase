import type ChatModel from '../../Infrastructure/Database/Models/chatsModel';
import type UsersModel from '../../Infrastructure/Database/Models/UserModels';

export interface IAdminChatRepository {
  createAdminChat: (data: {
    chats_id: number;
    users_id: number;
  }) => Promise<object>;

  getAdminChatById: (idChat: number) => Promise<object | null>;

  deleteAdminChat: (idChat: number) => Promise<boolean>;
  // updateAdminChat, getAdminChatsByAdminId, etc.
}

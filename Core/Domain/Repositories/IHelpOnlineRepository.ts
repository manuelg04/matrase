import { Token } from 'typedi';
export interface IHelpOnlineRepository {
  createHelpOnline: (
    userId: number,
    type: string,
    chatId: number
  ) => Promise<any>;
}
export const IHelpOnlineRepositoryToken = new Token<IHelpOnlineRepository>();

import { type CreateChatCommand } from './CreateChatCommand';
import { Inject, Service } from 'typedi';
import { type IHandler } from '../../Contracts/IHandler';
import { IChatRepository } from '../../../Domain/Repositories/IChatRepository';

@Service()
export class CreateChatHandler implements IHandler {
  constructor(@Inject() private readonly chatRepository: IChatRepository) {}

  async __invoke(command: CreateChatCommand): Promise<object | string> {
    try {
      const createChat = await this.chatRepository.createChat(
        command.users_id,
        command.novelties_id
      );
      return {
        Message: 'Chat creado correctamente',
        ChatData: createChat
      };
    } catch (error) {
      return {
        Message: 'Error al crear el chat',
        Error: error.message
      };
    }
  }
}

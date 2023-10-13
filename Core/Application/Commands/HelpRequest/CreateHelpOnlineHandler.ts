import { type CreateHelpOnlineCommand } from './CreateHelpOnlineCommand';
import { Service, Inject } from 'typedi';
import { type IHandler } from '../../Contracts/IHandler';
import { IHelpOnlineRepository } from '../../../Domain/Repositories/IHelpOnlineRepository';

@Service()
export class CreateHelpOnlineHandler implements IHandler {
  constructor(
    @Inject() private readonly helpOnlineRepository: IHelpOnlineRepository
  ) {}

  async __invoke(command: CreateHelpOnlineCommand): Promise<object | string> {
    try {
      const newHelpOnline = await this.helpOnlineRepository.createHelpRequest(
        command.userId,
        command.type,
        command.chatId
      );
      return {
        Message: 'Solicitud de ayuda creada correctamente',
        HelpOnlineData: newHelpOnline
      };
    } catch (error) {
      return {
        Message: 'Error al crear la solicitud de ayuda',
        Error: error.message
      };
    }
  }
}

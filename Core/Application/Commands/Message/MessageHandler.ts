import { type MessageCommand } from './MessageCommand';
import { Inject, Service } from 'typedi';
import { type IHandler } from '../../Contracts/IHandler';
import { MessageRepository } from '../../../Infrastructure/Repositories/MessageRepository';

@Service()
export class MessageHandler implements IHandler {
  constructor(
    @Inject() private readonly messageRepository: MessageRepository
  ) {}

  async __invoke(command: MessageCommand): Promise<object | string> {
    try {
      const createMessage = await this.messageRepository.createMessage(
        command.idChat,
        command.idUsuario,
        command.mensaje,
        command.tipoMensaje,
        command.fechaHora
      );
      return {
        Message: 'Mensaje creado correctamente',
        MessageData: createMessage
      };
    } catch (error) {
      return {
        Message: 'Error al crear el mensaje',
        Error: error.message
      };
    }
  }
}

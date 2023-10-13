import {
  type MessageFilesCommand,
  MessageFileActions
} from './MessageFilesCommand';
import { Inject, Service } from 'typedi';
import { type IHandler } from '../../Contracts/IHandler';
import { IMessageFilesRepository } from '../../../Domain/Repositories/IMessageFilesRepository';

@Service()
export class MessageFilesHandler implements IHandler {
  constructor(
    @Inject() private readonly filesRepository: IMessageFilesRepository
  ) {}

  async __invoke(command: MessageFilesCommand): Promise<object> {
    switch (command.action) {
      case MessageFileActions.CREATE:
        return await this.createFile(command);
      case MessageFileActions.DELETE:
        return await this.deleteFile(command);
      default:
        return { Message: 'Acción no válida' };
    }
  }

  private async createFile(command: MessageFilesCommand): Promise<object> {
    const fileData = {
      path: command.path!,
      mime_type: command.mime_type,
      messages_id: command.id!
    };

    const createdFile = await this.filesRepository.createFile(fileData);
    return {
      Message: 'Archivo creado exitosamente',
      Data: createdFile
    };
  }

  private async deleteFile(command: MessageFilesCommand): Promise<object> {
    const result = await this.filesRepository.deleteFile(command.id!);
    return {
      Message: result
        ? 'Archivo eliminado exitosamente'
        : 'Archivo no encontrado'
    };
  }
}

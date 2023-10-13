import type MessageFilesModel from '../../Infrastructure/Database/Models/messageFilesModel';

export interface IMessageFilesRepository {
  createFile: (data: Partial<MessageFilesModel>) => Promise<MessageFilesModel>;
  getFileById: (id: number) => Promise<MessageFilesModel | null>;
  deleteFile: (id: number) => Promise<boolean>;
  // Y otros métodos que consideres necesarios...
}

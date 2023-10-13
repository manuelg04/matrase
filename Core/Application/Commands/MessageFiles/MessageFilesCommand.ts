export enum MessageFileActions {
  CREATE = 'CREATE',
  DELETE = 'DELETE'
}

export class MessageFilesCommand {
  constructor(
    public action: MessageFileActions,
    public id?: number,
    public path?: string,
    public mime_type?: string,
    public id?: number
  ) {}
}

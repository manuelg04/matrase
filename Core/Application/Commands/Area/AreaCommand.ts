export enum AreaActions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export class AreaCommand {
  constructor(
    public action: AreaActions,
    public id?: number,
    public name?: string
  ) {}
}

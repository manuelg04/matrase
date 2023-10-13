export class CreateHelpOnlineCommand {
  constructor(
    public readonly userId: number,
    public readonly type: string,
    public readonly chatId: number
  ) {}
}

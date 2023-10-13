export class CreateHelpRequestCommand {
  constructor(
    public readonly type: string,
    public readonly description: string
  ) {}
}

import { injectable } from 'inversify';
import { type ICommandBus } from '../../Application/Contracts/Bus/ICommandBus';
import { type ICommand } from '../../Application/Contracts/ICommand';
import { type IHandler } from '../../Application/Contracts/IHandler';

@injectable()
export class SimpleCommandBus implements ICommandBus {
  private readonly handlers: Record<string, IHandler> = {};

  addHandler(commandName: string, commandHandler: IHandler): void {
    this.handlers[commandName] = commandHandler;
  }

  async execute(command: ICommand): Promise<object | string> {
    const commandName: string = command.constructor.name;
    const handler: IHandler = this.handlers[commandName];

    if (handler === undefined)
      throw new Error(`Handler for command ${commandName} not found`);

    return await handler.__invoke(command);
  }
}

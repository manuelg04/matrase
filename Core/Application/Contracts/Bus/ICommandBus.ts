import { type ICommand } from '../ICommand';
import { type IHandler } from '../IHandler';

export interface ICommandBus {
  addHandler: (commandName: string, commandHandler: IHandler) => void;

  execute: (command: ICommand) => Promise<object | string>;
}

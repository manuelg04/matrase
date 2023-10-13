import { type ICommand } from './ICommand';

export interface IHandler {
  __invoke: (command: ICommand) => Promise<ICommand>;
}

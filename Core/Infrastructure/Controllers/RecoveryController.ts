// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Request, Response } from 'express';
import { Container } from 'typedi';
import { RecoveryCommand } from '../../Application/Commands/Users/RecoveryCommand';
import { RecoveryHandler } from '../../Application/Commands/Users/RecoveryHandler';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class RecoveryController {
  public static async recovery(
    { body }: Request,
    res: Response
  ): Promise<void> {
    const recoveryCommand: RecoveryCommand = new RecoveryCommand(
      body.usuario_login,
      body.correo,
      body.cliente
    );

    const userRecoveryHandler: RecoveryHandler = Container.get(RecoveryHandler);

    const recoveryData: string | object = await userRecoveryHandler.__invoke(
      recoveryCommand
    );

    res.send(recoveryData);
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Request, Response } from 'express';
import { Container } from 'typedi';
import { ChangePasswordCommand } from '../../Application/Commands/Users/ChangePasswordCommand';
import { ChangePasswordHandler } from '../../Application/Commands/Users/ChangePasswordHandler';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ChangePasswordController {
  public static async changePassword(
    { body }: Request,
    res: Response
  ): Promise<void> {
    const changePasswordCommand: ChangePasswordCommand =
      new ChangePasswordCommand(
        body.usuario_login,
        body.cliente,
        body.usuario_password,
        body.usuario_password_nueva
      );

    const changePasswordHandler: ChangePasswordHandler = Container.get(
      ChangePasswordHandler
    );

    const changePasswordData: string | object =
      await changePasswordHandler.__invoke(changePasswordCommand);

    res.send(changePasswordData);
  }
}

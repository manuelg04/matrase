// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Request, Response } from 'express';
import { Container } from 'typedi';
import { LoginUserHandler } from '../../Application/Commands/Admin/LoginUserHandler';
import { LoginUserCommand } from '../../Application/Commands/Admin/LoginUserCommand';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthAdminController {
  public static async login({ body }: Request, res: Response): Promise<void> {
    const loginCommand: LoginUserCommand = new LoginUserCommand(
      body.user_login,
      body.user_password
    );

    const userLoginHandler: LoginUserHandler = Container.get(LoginUserHandler);

    const userData: string | object = await userLoginHandler.__invoke(
      loginCommand
    );

    res.send(userData);
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Request, Response } from 'express';
import { Container } from 'typedi';
import { LoginUserHandler } from '../../Application/Commands/Users/LoginUserHandler';
import { LoginUserCommand } from '../../Application/Commands/Users/LoginUserCommand';
import { type SilogTransLoginResponse } from '../../Domain/Interfaces/Silogtrans/SilogTransLoginResponse';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthController {
  public static async login({ body }: Request, res: Response): Promise<void> {
    const loginCommand: LoginUserCommand = new LoginUserCommand(
      body.usuario_login,
      body.usuario_password,
      body.tercero_codigo,
      body.cliente
    );

    const userLoginHandler: LoginUserHandler = Container.get(LoginUserHandler);

    const userData: string | object = await userLoginHandler.__invoke(
      loginCommand
    );

    res.send(userData);
  }
}

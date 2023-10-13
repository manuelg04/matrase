import { type UserLoginResponse } from '../Interfaces/UserLoginResponse';

export interface IUserRepository {
  loginUser: (
    usuarioLogin: string,
    resp?: object | undefined
  ) => Promise<UserLoginResponse>;

  validateInternalUser: (user: string) => Promise<boolean>;

  createUser: (
    usuarioLogin: string,
    usuarioPassword: string,
    resp?: object | undefined
  ) => Promise<boolean>;

  internalUser: (user: string, password: string) => Promise<object>;
}

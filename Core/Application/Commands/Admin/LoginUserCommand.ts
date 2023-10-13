export class LoginUserCommand {
  private readonly _usuario_login: string;
  private readonly _usuario_password: string;

  constructor(usuarioLogin: string, usuarioPassword: string) {
    this._usuario_login = usuarioLogin;
    this._usuario_password = usuarioPassword;
  }

  get usuarioLogin(): string {
    return this._usuario_login;
  }

  get usuarioPassword(): string {
    return this._usuario_password;
  }
}

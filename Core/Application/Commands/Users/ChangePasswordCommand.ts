export class ChangePasswordCommand {
  private readonly _usuario_login: string;
  private readonly _cliente: string;
  private readonly _usuario_password: string;
  private readonly _usuario_password_nueva: string;

  constructor(
    usuarioLogin: string,
    cliente: string,
    usuarioPassword: string,
    usuarioPasswordNueva: string
  ) {
    this._usuario_login = usuarioLogin;
    this._cliente = cliente;
    this._usuario_password = usuarioPassword;
    this._usuario_password_nueva = usuarioPasswordNueva;
  }

  get usuarioLogin(): string {
    return this._usuario_login;
  }

  get cliente(): string {
    return this._cliente;
  }

  get usuarioPassword(): string {
    return this._usuario_password;
  }

  get usuarioPasswordNueva(): string {
    return this._usuario_password_nueva;
  }
}

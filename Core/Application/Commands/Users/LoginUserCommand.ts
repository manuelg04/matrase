export class LoginUserCommand {
  private readonly _usuario_login: string;
  private readonly _usuario_password: string;
  private readonly _tercero_codigo: number;
  private readonly _cliente: string;

  constructor(
    usuarioLogin: string,
    usuarioPassword: string,
    terceroCodigo: number,
    cliente: string
  ) {
    this._usuario_login = usuarioLogin;
    this._usuario_password = usuarioPassword;
    this._tercero_codigo = terceroCodigo;
    this._cliente = cliente;
  }

  get usuarioLogin(): string {
    return this._usuario_login;
  }

  get usuarioPassword(): string {
    return this._usuario_password;
  }

  get terceroCodigo(): number {
    return this._tercero_codigo;
  }

  get cliente(): string {
    return this._cliente;
  }
}

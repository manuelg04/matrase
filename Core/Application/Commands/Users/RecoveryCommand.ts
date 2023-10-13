export class RecoveryCommand {
  private readonly _usuario_login: string;
  private readonly _correo: string;
  private readonly _cliente: string;

  constructor(usuarioLogin: string, correo: string, cliente: string) {
    this._usuario_login = usuarioLogin;
    this._correo = correo;
    this._cliente = cliente;
  }

  get usuarioLogin(): string {
    return this._usuario_login;
  }

  get correo(): string {
    return this._correo;
  }

  get cliente(): string {
    return this._cliente;
  }
}

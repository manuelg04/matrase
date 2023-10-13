export class Recovery {
  private readonly _success: boolean;
  private readonly _msj: string;
  private readonly _clave_temp: string;

  constructor(success: boolean, msj: string, claveTemp: string) {
    this._success = success;
    this._msj = msj;
    this._clave_temp = claveTemp;
  }

  get success(): boolean {
    return this._success;
  }

  get msj(): string {
    return this._msj;
  }

  get claveTemp(): string {
    return this._clave_temp;
  }
}

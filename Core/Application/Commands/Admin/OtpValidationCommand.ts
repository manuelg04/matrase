export class OtpValidationCommand {
  private readonly _user_login: string;
  private readonly _otp: string;
  private readonly _password: string;

  constructor(userLogin: string, otp: string, password: string) {
    this._user_login = userLogin;
    this._otp = otp;
    this._password = password;
  }

  get userLogin(): string {
    return this._user_login;
  }

  get otp(): string {
    return this._otp;
  }

  get password(): string {
    return this._password;
  }
}

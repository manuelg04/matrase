export class User {
  private readonly _code: string;
  private readonly _name: string;
  private readonly _email: string;
  // private readonly _password: string;
  // private readonly _phone: string;
  private readonly _changePassword: boolean;
  private readonly _companyName: string;
  private readonly _companyCodeCs: string;
  private readonly _thirdPartyCode: string;
  private readonly _thirdPartyName: string;
  private readonly _role: string[];
  private readonly _lastName: string;
  private readonly _area: number;
  private readonly _id: number;

  constructor(
    code: string,
    name: string,
    email: string,
    // password: string,
    // phone: string,
    changePassword: boolean,
    companyName: string,
    companyCodeCs: string,
    thirdPartyCode: string,
    thirdPArtyName: string,
    role: string[],
    lastName: string,
    area: number,
    id: number
  ) {
    this._code = code;
    this._name = name;
    this._email = email;
    // this._password = password;
    // this._phone = phone;
    this._changePassword = changePassword;
    this._companyName = companyName;
    this._companyCodeCs = companyCodeCs;
    this._thirdPartyCode = thirdPartyCode;
    this._thirdPartyName = thirdPArtyName;
    this._role = role;
    this._lastName = lastName;
    this._area = area;
    this._id = id;
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  // get password(): string {
  //   return this._password;
  // }

  // get phone(): string {
  //   return this._phone;
  // }

  get changePassword(): boolean {
    return this._changePassword;
  }

  get companyName(): string {
    return this._companyName;
  }

  get companyCodeCs(): string {
    return this._companyCodeCs;
  }

  get thirdPartyCode(): string {
    return this._thirdPartyCode;
  }

  get thirdPartyName(): string {
    return this._thirdPartyName;
  }

  get role(): string[] {
    return this._role;
  }

  get lastName(): string {
    return this._lastName;
  }

  get area(): number {
    return this._area;
  }

  get id(): number {
    return this._id;
  }
}

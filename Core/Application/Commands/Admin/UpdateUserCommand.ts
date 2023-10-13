export class UpdateUserCommand {
  private readonly _name: string;
  private readonly _last_name: string;
  private readonly _email: string;
  private readonly _area: number;

  constructor(name: string, lastName: string, email: string, area: number) {
    this._name = name;
    this._last_name = lastName;
    this._email = email;
    this._area = area;
  }

  get name(): string {
    return this._name;
  }

  get lastName(): string {
    return this._last_name;
  }

  get email(): string {
    return this._email;
  }

  get area(): number {
    return this._area;
  }
}

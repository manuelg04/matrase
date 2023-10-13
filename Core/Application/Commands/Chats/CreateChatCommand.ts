/* eslint-disable @typescript-eslint/naming-convention */
export class CreateChatCommand {
  private readonly _users_id: number;
  private readonly _novelties_id: number;

  constructor(users_id: number, novelties_id: number) {
    this._users_id = users_id;
    this._novelties_id = novelties_id;
  }

  get users_id(): number {
    return this._users_id;
  }

  get novelties_id(): number {
    return this._novelties_id;
  }
}

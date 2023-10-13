/* eslint-disable @typescript-eslint/naming-convention */
export enum NoveltyActions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export class NoveltyCommand {
  private readonly _action: NoveltyActions;
  private readonly _id?: number; // operaciones como UPDATE y DELETE
  private readonly _name?: string;
  private readonly _description?: string;
  private readonly _image_path?: string;
  private readonly _area_id?: number;

  constructor(
    action: NoveltyActions,
    id?: number,
    name?: string,
    description?: string,
    area_id?: number,
    image_path?: string
  ) {
    this._action = action;
    this._id = id;
    this._name = name;
    this._description = description;
    this._image_path = image_path;
    this._area_id = area_id;
  }

  get action(): NoveltyActions {
    return this._action;
  }

  get id(): number | undefined {
    return this._id;
  }

  get name(): string | undefined {
    return this._name;
  }

  get description(): string | undefined {
    return this._description;
  }

  get image_path(): string | undefined {
    return this._image_path;
  }

  get area_id(): number | undefined {
    return this._area_id;
  }
}

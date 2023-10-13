// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateUserCommand } from '../../Application/Commands/Admin/CreateUserCommand';
import { CreateUserHandler } from '../../Application/Commands/Admin/CreateUserHandler';
import { DeleteUserCommand } from '../../Application/Commands/Admin/DeleteUserCommand';
import { DeleteUserHandler } from '../../Application/Commands/Admin/DeleteUserHandler';
import { UpdateUserCommand } from '../../Application/Commands/Admin/UpdateUserCommand';
import { UpdateUserHandler } from '../../Application/Commands/Admin/UpdateUserHandler';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CrudAdminController {
  public static async create({ body }: Request, res: Response): Promise<void> {
    const createUserCommand: CreateUserCommand = new CreateUserCommand(
      body.name,
      body.last_name,
      body.email,
      body.password,
      body.area
    );

    const createUserHandler: CreateUserHandler =
      Container.get(CreateUserHandler);

    const recoveryData: string | object = await createUserHandler.__invoke(
      createUserCommand
    );

    res.send(recoveryData);
  }

  public static async update(
    { params, body }: Request,
    res: Response
  ): Promise<void> {
    const updateUserCommand: UpdateUserCommand = new UpdateUserCommand(
      body.name,
      body.last_name,
      params.email,
      body.area
    );

    const updateUserHandler: UpdateUserHandler =
      Container.get(UpdateUserHandler);

    const recoveryData: string | object = await updateUserHandler.__invoke(
      updateUserCommand
    );

    res.send(recoveryData);
  }

  public static async delete(
    { params }: Request,
    res: Response
  ): Promise<void> {
    const deleteUserCommand: DeleteUserCommand = new DeleteUserCommand(
      params.email
    );

    const deleteUserHandler: DeleteUserHandler =
      Container.get(DeleteUserHandler);

    const recoveryData: string | object = await deleteUserHandler.__invoke(
      deleteUserCommand
    );

    res.send(recoveryData);
  }
}

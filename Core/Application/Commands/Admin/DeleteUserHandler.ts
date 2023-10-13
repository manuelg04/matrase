import { type IHandler } from '../../Contracts/IHandler';
import { Inject, Service } from 'typedi';
import { CrudUserRepository } from '../../../Infrastructure/Repositories/Admin/CrudUserRepository';
import { type DeleteUserCommand } from './DeleteUserCommand';

@Service()
export class DeleteUserHandler implements IHandler {
  constructor(
    @Inject()
    private readonly crudUserRepository: CrudUserRepository
  ) {}

  async __invoke(command: DeleteUserCommand): Promise<object | string> {
    // validacion del usuario y eliminarlo si existe en la BD
    const respValidation = await this.crudUserRepository.deleteUser(
      command.email
    );

    if (!respValidation) {
      return {
        Message: 'El usuario NO se elimina correctamente de la BD'
      };
    } else {
      return {
        Message: 'El usuario se elimina correctamente en la BD'
      };
    }
  }
}

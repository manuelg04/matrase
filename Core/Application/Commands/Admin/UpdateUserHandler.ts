import { type IHandler } from '../../Contracts/IHandler';
import { Inject, Service } from 'typedi';
import { CrudUserRepository } from '../../../Infrastructure/Repositories/Admin/CrudUserRepository';
import { type UpdateUserCommand } from './UpdateUserCommand';

@Service()
export class UpdateUserHandler implements IHandler {
  constructor(
    @Inject()
    private readonly crudUserRepository: CrudUserRepository
  ) {}

  async __invoke(command: UpdateUserCommand): Promise<object | string> {
    // validacion del usuario si existe en la BD
    const respValidation = await this.crudUserRepository.validateUser(
      command.email
    );

    // agregar usuario a la BD sino existe el registro
    if (respValidation) {
      const respCreation = await this.crudUserRepository.updateUser(
        command.name,
        command.lastName,
        command.email,
        command.area
      );

      if (!respCreation) {
        return {
          Message: 'No se actualiza correctamente el usuario en la BD'
        };
      } else {
        return {
          Message: 'Se actualiza correctamente el usuario en la BD'
        };
      }
    } else {
      return {
        Message: 'El usuario no existe en la BD'
      };
    }
  }
}

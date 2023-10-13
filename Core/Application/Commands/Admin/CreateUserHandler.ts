import { type IHandler } from '../../Contracts/IHandler';
import { Inject, Service } from 'typedi';
import { type CreateUserCommand } from './CreateUserCommand';
import { CrudUserRepository } from '../../../Infrastructure/Repositories/Admin/CrudUserRepository';

@Service()
export class CreateUserHandler implements IHandler {
  constructor(
    @Inject()
    private readonly crudUserRepository: CrudUserRepository
  ) {}

  async __invoke(command: CreateUserCommand): Promise<object | string> {
    // validacion del usuario si existe en la BD
    const respValidation = await this.crudUserRepository.validateUser(
      command.email
    );

    // agregar usuario a la BD sino existe el registro
    if (!(respValidation ?? false)) {
      const respCreation = await this.crudUserRepository.createUser(
        command.name,
        command.lastName,
        command.email,
        command.password,
        command.area
      );

      if (!respCreation) {
        return {
          Message: 'No se crea correctamente el usuario en la BD'
        };
      } else {
        return {
          Message: 'Se crea correctamente el usuario en la BD'
        };
      }
    } else {
      return {
        Message: 'El usuario ya existe en la BD'
      };
    }
  }
}

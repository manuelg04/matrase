import { type IHandler } from '../../Contracts/IHandler';
import { type ICommand } from '../../Contracts/ICommand';
import { User } from '../../../Domain/Entities/User';
import { type UserLoginResponse } from '../../../Domain/Interfaces/UserLoginResponse';
import { Inject, Service } from 'typedi';
import { UserRepository } from '../../../Infrastructure/Repositories/UserRepository';
import { SilogTransRepository } from '../../../Infrastructure/Repositories/SilogTrans/SilogTransRepository';
import { type LoginUserCommand } from './LoginUserCommand';
import { type SilogTransLoginResponse } from '../../../Domain/Interfaces/Silogtrans/SilogTransLoginResponse';

@Service()
export class LoginUserHandler implements IHandler {
  constructor(
    @Inject()
    private readonly userRepository: UserRepository,
    @Inject()
    private readonly silogTransRepository: SilogTransRepository
  ) {}

  async __invoke(command: LoginUserCommand): Promise<object | string> {
    const resp = await this.silogTransRepository.loginUser(
      command.usuarioLogin,
      command.usuarioPassword,
      command.terceroCodigo,
      command.cliente
    );

    if (resp === false) {
      return {
        Message: 'El Usuario / Clave Incorrecto'
      };
    } else {
      // validacion del repuesta silogtrans
      const respValidation = await this.userRepository.validateInternalUser(
        command.usuarioLogin
      );

      // agregar usuario a la BD sino existe el registro
      if (!(respValidation ?? false)) {
        const respCreation = await this.userRepository.createUser(
          command.usuarioLogin,
          command.usuarioPassword,
          resp
        );

        if (!respCreation) {
          return {
            Message: 'No se crea correctamente el usuario en la BD'
          };
        }
      }

      // generar el token interno
      const respUser = await this.userRepository.loginUser(
        command.usuarioLogin,
        resp
      );

      return {
        user: new User(
          resp.usuario.usuario_codigo,
          resp.usuario.usuario_nombre,
          command.usuarioLogin,
          resp.usuario.usuario_cambioclave,
          resp.usuario.empresa_nombre,
          resp.usuario.empresa_codigo_cs,
          resp.usuario.tercero_codigo,
          resp.usuario.tercero_nombre,
          resp.usuario.tercero_tipo,
          '',
          0,
          0
        ),
        internalToken: respUser.internalToken,
        silogtransToken: resp.token
      };
    }
  }
}

import { type IHandler } from '../../Contracts/IHandler';
import { type ICommand } from '../../Contracts/ICommand';
import { User } from '../../../Domain/Entities/User';
import { Inject, Service } from 'typedi';
import { UserRepository } from '../../../Infrastructure/Repositories/UserRepository';
import { SilogTransRepository } from '../../../Infrastructure/Repositories/SilogTrans/SilogTransRepository';
import { type LoginUserCommand } from './LoginUserCommand';

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
      process.env.USER_SERVICE as string,
      process.env.USER_PASSWORD as string,
      process.env.USER_THIRD as unknown as number,
      process.env.USER_CUSTOMER as string
    );

    if (resp.usuario.usuario_codigo === null) {
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
        return {
          Message: 'El Usuario / Contraseña Incorrecto o NO existe en la BD'
        };
      } else {
        // Validar Usuario/Contraseña
        const respDataUser = await this.userRepository.internalUser(
          command.usuarioLogin,
          command.usuarioPassword
        );

        // Generar el token interno
        const respUser = await this.userRepository.loginUser(
          command.usuarioLogin,
          resp
        );

        if (JSON.stringify(respDataUser.dataValues) === '{}') {
          return {
            Message: 'El Usuario / Contraseña Incorrecto'
          };
        } else {
          return {
            user: new User(
              respDataUser.dataValues.code,
              respDataUser.dataValues.name,
              command.usuarioLogin,
              respDataUser.dataValues.change_password,
              respDataUser.dataValues.company_name,
              respDataUser.dataValues.company_code_cs,
              respDataUser.dataValues.third_party_code,
              respDataUser.dataValues.third_party_name,
              respDataUser.dataValues.role_id,
              respDataUser.dataValues.last_name,
              respDataUser.dataValues.area,
              respDataUser.dataValues.id
            ),
            internalToken: respUser.internalToken,
            silogtransToken: resp.token
          };
        }
      }
    }
  }
}

import { type IHandler } from '../../Contracts/IHandler';
import { Inject, Service } from 'typedi';
import { type ChangePasswordCommand } from './ChangePasswordCommand';
import { SilogTransChangeTokenRepository } from '../../../Infrastructure/Repositories/SilogTrans/SilogTransChangeTokenRepository';

@Service()
export class ChangePasswordHandler implements IHandler {
  constructor(
    @Inject()
    private readonly silogTransChangeTokenRepository: SilogTransChangeTokenRepository
  ) {}

  async __invoke(command: ChangePasswordCommand): Promise<object | string> {
    const resp = await this.silogTransChangeTokenRepository.ChangeToken(
      command.usuarioLogin,
      command.cliente,
      command.usuarioPassword,
      command.usuarioPasswordNueva
    );

    if (resp === undefined) {
      return {
        silogtransToken: 'Error al consumir el servicio'
      };
    } else {
      return {
        silogtransToken: resp.token
      };
    }
  }
}

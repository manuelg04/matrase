import { type IHandler } from '../../Contracts/IHandler';
import { Inject, Service } from 'typedi';
import { type RecoveryCommand } from './RecoveryCommand';
import { Recovery } from '../../../Domain/Entities/Recovery';
import { RecoveryRepository } from '../../../Infrastructure/Repositories/RecoveryRepository';

@Service()
export class RecoveryHandler implements IHandler {
  constructor(
    @Inject() private readonly recoveryRepository: RecoveryRepository
  ) {}

  async __invoke(command: RecoveryCommand): Promise<object | string> {
    const resp = await this.recoveryRepository.RecoveryUser(
      command.usuarioLogin,
      command.correo,
      command.cliente
    );

    return {
      data: new Recovery(resp.success, resp.msj, resp.clave_temp)
    };
  }
}

import { type IHandler } from '../../Contracts/IHandler';
import { Inject, Service } from 'typedi';
import { type OtpGeneratorCommand } from './OtpGeneratorCommand';
import { OtpRepository } from '../../../Infrastructure/Repositories/Admin/OtpRepository';

@Service()
export class OtpGeneratorHandler implements IHandler {
  constructor(
    @Inject()
    private readonly otpRepository: OtpRepository
  ) {}

  async __invoke(command: OtpGeneratorCommand): Promise<object | string> {
    // Generar OTP
    const respOtp = await this.otpRepository.otpGenerator(command.email);

    if (respOtp === false) {
      return {
        Message: 'No se genera correctamente OTP'
      };
    } else {
      const respNotification = await this.otpRepository.sendOtpGenerator(
        command.email,
        respOtp
      );

      if (respNotification === false) {
        return {
          Message: 'NO se envia correctamente OTP al correo: ' + command.email
        };
      } else {
        return {
          Message: 'Se envia correctamente OTP al correo: ' + command.email
        };
      }
    }
  }
}

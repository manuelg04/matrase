import { type IHandler } from '../../Contracts/IHandler';
import { Inject, Service } from 'typedi';
import { type OtpValidationCommand } from './OtpValidationCommand';
import { OtpRepository } from '../../../Infrastructure/Repositories/Admin/OtpRepository';

@Service()
export class OtpValidationHandler implements IHandler {
  constructor(
    @Inject()
    private readonly otpRepository: OtpRepository
  ) {}

  async __invoke(command: OtpValidationCommand): Promise<object | string> {
    const respValidationOtp = await this.otpRepository.validationOtp(
      command.userLogin,
      command.otp
    );

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!(respValidationOtp ?? false)) {
      return {
        Message: 'El usuario y/o codigo OTP NO es correcto'
      };
    } else {
      const respValidation = await this.otpRepository.updatePassword(
        command.userLogin,
        command.password
      );

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!(respValidation ?? false)) {
        return {
          Message: 'La contraseña esta vacia'
        };
      } else {
        return {
          Message:
            'Se actualizo correctamente la contraseña del usuario: ' +
            command.userLogin
        };
      }
    }
  }
}

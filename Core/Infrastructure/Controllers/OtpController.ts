// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Request, Response } from 'express';
import { Container } from 'typedi';
import { OtpGeneratorCommand } from '../../Application/Commands/Admin/OtpGeneratorCommand';
import { OtpGeneratorHandler } from '../../Application/Commands/Admin/OtpGeneratorHandler';
import { OtpValidationCommand } from '../../Application/Commands/Admin/OtpValidationCommand';
import { OtpValidationHandler } from '../../Application/Commands/Admin/OtpValidationHandler';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class OtpController {
  public static async generate(
    { body }: Request,
    res: Response
  ): Promise<void> {
    const otpGeneratorCommand: OtpGeneratorCommand = new OtpGeneratorCommand(
      body.email
    );

    const userOtpGeneratorHandler: OtpGeneratorHandler =
      Container.get(OtpGeneratorHandler);

    const recoveryData: string | object =
      await userOtpGeneratorHandler.__invoke(otpGeneratorCommand);

    res.send(recoveryData);
  }

  public static async validate(
    { body }: Request,
    res: Response
  ): Promise<void> {
    const otpValidationCommand: OtpValidationCommand = new OtpValidationCommand(
      body.user_login,
      body.code_otp,
      body.password
    );

    const userOtpValidationHandler: OtpValidationHandler =
      Container.get(OtpValidationHandler);

    const recoveryData: string | object =
      await userOtpValidationHandler.__invoke(otpValidationCommand);

    res.send(recoveryData);
  }
}

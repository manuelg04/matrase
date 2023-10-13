/* eslint-disable @typescript-eslint/no-explicit-any */
import { type IOtpRepository } from '../../../Domain/Repositories/IOtpRepository';
import { Inject, Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import otpGenerator from 'otp-generator';
import UsersModel from '../../Database/Models/UserModels';
import { sendEmailSendgrid } from '../../Utils/sendgrid_mail';
import * as bcrypt from 'bcryptjs';

@Service()
export class OtpRepository implements IOtpRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async otpGenerator(userLogin: string): Promise<string | boolean> {
    const otp = otpGenerator.generate(5, {
      upperCaseAlphabets: false,
      specialChars: false
    });

    if (userLogin === undefined || userLogin === null) {
      return false;
    } else {
      const usersRepo = this.sequelize.getRepository(UsersModel);
      const userFind = await usersRepo.findOne({ where: { email: userLogin } });

      if (userFind == null) return false;
      void userFind.update({ change_password: 1, code_otp: otp });

      if (otp != null) {
        return otp;
      } else {
        return false;
      }
    }
  }

  async sendOtpGenerator(
    email: string,
    otp: string | boolean
  ): Promise<object | boolean> {
    const data = {
      USER: email,
      OTP: otp
    };

    try {
      const send = await sendEmailSendgrid(
        email,
        process.env.TEMPLATE_OTP,
        data
      );

      return true;
    } catch (error: any) {
      return false;
    }
  }

  async validationOtp(
    userLogin: string,
    otp: string | boolean
  ): Promise<object | boolean> {
    if (userLogin === undefined || userLogin === null) {
      return false;
    } else {
      const usersRepo = this.sequelize.getRepository(UsersModel);
      const userFind = await usersRepo.findOne({ where: { email: userLogin } });

      if (otp !== userFind?.code_otp) {
        return false;
      } else {
        return true;
      }
    }
  }

  async updatePassword(
    userLogin: string,
    userPassword: string
  ): Promise<object | boolean> {
    if (userPassword === null) {
      throw new Error('La contraseña esta vacia');
    } else {
      const salt = bcrypt.genSaltSync(10);
      userPassword = bcrypt.hashSync(userPassword, salt);

      if (userLogin === undefined || userLogin === null) {
        return false;
      } else {
        const usersRepo = this.sequelize.getRepository(UsersModel);
        const userFind = await usersRepo.findOne({
          where: { email: userLogin }
        });

        if (userFind == null) return false;
        void userFind.update({
          change_password: 0,
          password: userPassword,
          code_otp: '0'
        });
        return true;
      }
    }
  }
}

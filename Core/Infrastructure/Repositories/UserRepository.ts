/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type IUserRepository } from '../../Domain/Repositories/IUserRepository';
import { type UserLoginResponse } from '../../Domain/Interfaces/UserLoginResponse';
import { Inject, Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import UsersModel from '../Database/Models/UserModels';
import * as bcrypt from 'bcryptjs';
import { AuthUtils } from '../Utils/AuthUtils';
import { mapRoleIdToUserType } from '../Utils/chatHelper';

@Service()
export class UserRepository implements IUserRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async validateInternalUser(user: string): Promise<boolean> {
    if (user === undefined || user === null) {
      return false;
    } else {
      const usersRepo = this.sequelize.getRepository(UsersModel);
      const userFind = await usersRepo.findOne({ where: { email: user } });

      if (userFind != null) {
        return true;
      } else {
        return false;
      }
    }
  }

  async createUser(
    userLogin: string,
    userPassword: string,
    resp?: object | any
  ): Promise<boolean> {
    if (userPassword === null) {
      throw new Error('La contraseña esta vacia');
    } else {
      const salt = bcrypt.genSaltSync(10);
      userPassword = bcrypt.hashSync(userPassword, salt);

      const usersRepo = this.sequelize.getRepository(UsersModel);

      const savedUser = await usersRepo.create({
        code: resp.usuario.usuario_codigo,
        name: resp.usuario.usuario_nombre,
        company_name: resp.usuario.empresa_nombre,
        company_code_cs: resp.usuario.empresa_codigo_cs,
        email: userLogin,
        password: userPassword,
        phone: '',
        change_password: 0,
        third_party_code: resp.usuario.tercero_codigo,
        third_party_name: resp.usuario.tercero_nombre,
        role_id: 2
      });

      if (savedUser != null) {
        return true;
      } else {
        return false;
      }
    }
  }

  async loginUser(
    userLogin: string,
    resp?: object | any
  ): Promise<UserLoginResponse> {
    const userCode: string | any = resp.usuario.usuario_codigo;
    const thirdCode = resp.usuario.tercero_codigo;

    const internalToken = await AuthUtils.generateToken(
      userLogin,
      userCode,
      thirdCode
    );

    return {
      internalToken: internalToken.internalToken
    };
  }

  async internalUser(user: string, password: string): Promise<object> {
    if (user === undefined || user === null) {
      const data: any = { dataValues: {} };
      return data;
    } else {
      const usersRepo = this.sequelize.getRepository(UsersModel);
      const userFind = await usersRepo.findOne({ where: { email: user } });
      const passbd = userFind?.password;

      // Comprobamos...
      const validatePassword = await bcrypt.compare(password, passbd);

      if (!(validatePassword ?? false)) {
        const data: any = { dataValues: {} };
        return data;
      } else {
        return userFind;
      }
    }
  }

  async getUserDetails(userId: number) {
    const usersRepo = this.sequelize.getRepository(UsersModel);
    const user = await usersRepo.findOne({ where: { id: userId } });

    if (user != null) {
      user.type = mapRoleIdToUserType(user.role_id);
      return user;
    }

    return null;
  }
}

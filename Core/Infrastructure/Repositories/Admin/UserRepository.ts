/* eslint-disable @typescript-eslint/no-explicit-any */
import { type IUserRepository } from '../../Domain/Repositories/IUserRepository';
import { Inject, Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import UsersModel from '../Database/Models/UserModels';
import * as bcrypt from 'bcryptjs';

@Service()
export class UserRepository implements IUserRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async createUser(
    userLogin: string,
    userPassword: string,
    resp?: object | any
  ): Promise<boolean> {
    if (userPassword === null) {
      return false;
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
        role_id: null
      });

      if (savedUser != null) {
        return true;
      } else {
        return false;
      }
    }
  }
}

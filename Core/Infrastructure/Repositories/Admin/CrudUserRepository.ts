/* eslint-disable @typescript-eslint/no-explicit-any */
import { type IUserAdminRepository } from '../../../Domain/Repositories/IUserAdminRepository';
import { Inject, Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import UsersModel from '../../Database/Models/UserModels';
import * as bcrypt from 'bcryptjs';

@Service()
export class CrudUserRepository implements IUserAdminRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async validateUser(email: string): Promise<boolean> {
    if (email === undefined || email === null) {
      return false;
    } else {
      const usersRepo = this.sequelize.getRepository(UsersModel);
      const userFind = await usersRepo.findOne({ where: { email } });

      if (userFind != null) {
        return true;
      } else {
        return false;
      }
    }
  }

  async createUser(
    name: string,
    lastName: string,
    email: string,
    password: string,
    area: number
  ): Promise<boolean> {
    if (password === null || email === null || email === undefined) {
      return false;
    } else {
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);

      const usersRepo = this.sequelize.getRepository(UsersModel);

      const savedUser = await usersRepo.create({
        name,
        last_name: lastName,
        email,
        password,
        phone: '',
        change_password: 0,
        area
      });

      if (savedUser != null) {
        return true;
      } else {
        return false;
      }
    }
  }

  async updateUser(
    name: string,
    lastName: string,
    email: string,
    area: number
  ): Promise<boolean> {
    if (email === undefined || email === null) {
      return false;
    } else {
      const usersRepo = this.sequelize.getRepository(UsersModel);
      const userFind = await usersRepo.findOne({
        where: { email }
      });

      if (userFind == null) return false;
      void userFind.update({
        name,
        last_name: lastName,
        area
      });
      return true;
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    if (email === undefined || email === null) {
      return false;
    } else {
      const usersRepo = this.sequelize.getRepository(UsersModel);
      const userFind = await usersRepo.findOne({
        where: { email }
      });

      if (userFind == null) return false;
      void userFind.destroy({});
      return true;
    }
  }
}

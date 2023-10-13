import axios from 'axios';
import { Service, Inject } from 'typedi';
import { type SilogTransLoginResponse } from '../../../Domain/Interfaces/Silogtrans/SilogTransLoginResponse';
import { Sequelize } from 'sequelize-typescript';
import { type ISilogTransRepository } from '../../../Domain/Repositories/ISilogTransRepository';

@Service()
export class SilogTransRepository implements ISilogTransRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async loginUser(
    usuarioLogin: string,
    usuarioPassword: string,
    terceroCodigo?: number,
    cliente?: string
  ): Promise<SilogTransLoginResponse | boolean> {
    try {
      const silogTransResp = await axios.post(
        process.env.URL_POST as string,
        {
          usuario_login: usuarioLogin,
          usuario_password: usuarioPassword,
          tercero_codigo: terceroCodigo,
          cliente
        },
        {
          params: { api: 'servicio.Seguridad.login' }
        }
      );

      return silogTransResp.data.data;
    } catch (error: any) {
      return false;
    }
  }

  async validateInternalUser(user: string): Promise<boolean> {
    return false;
  }

  async createUser(user: string): Promise<boolean> {
    return false;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Service } from 'typedi';
import { type IRecoveryRepository } from '../../Domain/Repositories/IRecoveryRepository';
import { type RecoveryResponse } from '../../Domain/Interfaces/RecoveryResponse';
import axios from 'axios';

@Service()
export class RecoveryRepository implements IRecoveryRepository {
  async RecoveryUser(
    userLogin: string,
    email: string,
    cliente: string
  ): Promise<RecoveryResponse> {
    try {
      const recoveryUserResp = await axios.post(
        process.env.URL_POST as string,
        {
          usuario_login: userLogin,
          correo: email,
          cliente,
        },
        {
          params: { api: 'servicio.ApiMatrase.recordarClave' }
        }
      );

      return recoveryUserResp.data.data;
    } catch (error: any) {
      const data: any = {
        success: false,
        msj:
          'No existe usuario: ' +
          userLogin +
          ', asociado al correo ' +
          email +
          ' o esta inactivo.',
        clave_temp: '',
      };
      return data;
    }
  }
}

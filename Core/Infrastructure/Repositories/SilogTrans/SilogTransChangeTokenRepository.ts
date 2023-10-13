import axios from 'axios';
import { Service, Inject } from 'typedi';
import { type SilogTransChangeTokenResponse } from '../../../Domain/Interfaces/Silogtrans/SilogTransChangeTokenResponse';
import { type ISilogTransChangeToken } from '../../../Domain/Repositories/ISilogTransChangeToken';

@Service()
export class SilogTransChangeTokenRepository implements ISilogTransChangeToken {
  async ChangeToken(
    userLogin: string,
    client: string,
    userPassword: string,
    userPasswordNew: string
  ): Promise<SilogTransChangeTokenResponse> {
    try {
      const silogTransResp = await axios.post(
        process.env.URL_POST as string,
        {
          usuario_login: userLogin,
          cliente: client,
          usuario_password: userPassword,
          usuario_password_nueva: userPasswordNew
        },
        {
          params: { api: 'servicio.ApiMatrase.cambioClave' }
        }
      );

      return silogTransResp.data.data;
    } catch (error: any) {
      const data: any = { token: error.response.data.msg };
      return data;
    }
  }
}

import { type SilogTransLoginResponse } from '../Interfaces/Silogtrans/SilogTransLoginResponse';

export interface ISilogTransRepository {
  loginUser: (
    usuarioLogin: string,
    usuarioPassword: string,
    terceroCodigo?: number,
    cliente?: string
  ) => Promise<SilogTransLoginResponse | boolean>;

  validateInternalUser: (user: string) => Promise<boolean>; // Ir a la base de datos y consultar si el usuario logueado en silogtrans existe o no.
}

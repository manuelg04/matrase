import { type SilogTransChangeTokenResponse } from '../Interfaces/Silogtrans/SilogTransChangeTokenResponse';

export interface ISilogTransChangeToken {
  ChangeToken: (
    userLogin: string,
    customer: string,
    userPassword: string,
    userPasswordNew: string
  ) => Promise<SilogTransChangeTokenResponse>;
}

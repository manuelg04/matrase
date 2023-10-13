import { type RecoveryResponse } from '../Interfaces/RecoveryResponse';

export interface IRecoveryRepository {
  RecoveryUser: (
    userLogin: string,
    email: string,
    customer: string
  ) => Promise<RecoveryResponse>;
}

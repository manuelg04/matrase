import { Container } from 'inversify';
import { UserRepository } from './Infrastructure/Repositories/UserRepository';
import { type IUserRepository } from './Domain/Repositories/IUserRepository';
import { REPOSITORY_TYPES } from './Infrastructure/Repositories/RepositoryTypes';
import { type ICommandBus } from './Application/Contracts/Bus/ICommandBus';
import { SimpleCommandBus } from './Infrastructure/Bus/SimpleCommandBus';
import { COMMAND_BUS_TYPES } from './Infrastructure/Bus/CommandBusTypes';
import { LoginUserHandler } from './Application/Commands/Users/LoginUserHandler';
import { SilogTransRepository } from './Infrastructure/Repositories/SilogTrans/SilogTransRepository';
import { RecoveryRepository } from './Infrastructure/Repositories/RecoveryRepository';
import { type IRecoveryRepository } from './Domain/Repositories/IRecoveryRepository';
import { type ISilogTransRepository } from './Domain/Repositories/ISilogTransRepository';
import { SilogTransChangeTokenRepository } from './Infrastructure/Repositories/SilogTrans/SilogTransChangeTokenRepository';
import { type ISilogTransChangeToken } from './Domain/Repositories/ISilogTransChangeToken';

const container: Container = new Container();

container
  .bind<IUserRepository>(REPOSITORY_TYPES.UserRepository)
  .to(UserRepository);

container
  .bind<ISilogTransRepository>(REPOSITORY_TYPES.SilogTransRepository)
  .to(SilogTransRepository);

container
  .bind<IRecoveryRepository>(REPOSITORY_TYPES.RecoveryRepository)
  .to(RecoveryRepository);

container
  .bind<ISilogTransChangeToken>(
    REPOSITORY_TYPES.SilogTransChangeTokenRepository
  )
  .to(SilogTransChangeTokenRepository);

container
  .bind<ICommandBus>(COMMAND_BUS_TYPES.SimpleCommandBus)
  .to(SimpleCommandBus);

container.bind(LoginUserHandler).toSelf();
export { container };

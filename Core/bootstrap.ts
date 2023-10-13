// noinspection HttpUrlsUsage
import 'reflect-metadata';

import { App } from './application';
import { container } from './di-container';
import { DBService } from './dbService';
import { Sequelize } from 'sequelize';

import './Infrastructure/Controllers/BaseController';
import './Infrastructure/Controllers/User/LoginUserController';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export async function bootstrap(): Promise<App> {
  const dbService = new DBService();
  const sequelize = await dbService.connect();

  container.bind(Sequelize).toConstantValue(sequelize);

  const app = new App();
  await app.setup();

  return app;
}

void bootstrap().then();

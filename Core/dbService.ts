/* eslint-disable n/handle-callback-err */
import DBConfig from './Infrastructure/Database/config/databse-config';
import { Sequelize } from 'sequelize-typescript';

export class DBService {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async connect() {
    const sequelize = new Sequelize(
      // eslint-disable-next-line n/no-path-concat
      new DBConfig(`${__dirname}/Infrastructure/Database/Models`)
    );

    sequelize
      .authenticate()
      .then(() => {})
      .catch((error) => {});

    return sequelize;
  }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
dotenv.config();

const getConfig = () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_DIALECT: process.env.DB_DIALECT
  };
};

const getSanitizedConfig = (config) => {
  for (const [key, value] of Object.entries(config))
    if (value === undefined)
      throw new Error(`Missing key ${key} in config.env`);

  return config;
};

const safeConfig = getSanitizedConfig(getConfig());

module.exports = safeConfig;

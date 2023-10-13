/* eslint-disable no-undef */
require('dotenv').config();

interface ENV {
  NODE_ENV: string | undefined;
  DB_USERNAME: string | undefined;
  DB_HOST: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_DATABASE: string | undefined;
  DB_PORT: string | undefined;
  DB_DIALECT: string | undefined;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
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

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config))
    if (value === undefined)
      throw new Error(`Missing key ${key} in config.env`);

  return config as Config;
};

const safeConfig = getSanitizedConfig(getConfig());

export default safeConfig;

export type Config = Required<ENV>;

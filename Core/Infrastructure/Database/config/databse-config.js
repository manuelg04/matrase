const safeConfig = require('../../Configs/config');

const development = {
  username: safeConfig.DB_USERNAME,
  password: safeConfig.DB_PASSWORD,
  database: safeConfig.DB_DATABASE,
  host: safeConfig.DB_HOST,
  port: parseInt(safeConfig.DB_PORT || '0'),
  dialect: safeConfig.DB_DIALECT || 'mysql',
  logging: console.log,
  pool: { max: 5, idle: 30 }
  // Puedes agregar dialectOptions u otras opciones si las necesitas
};

// Por ahora, mantendré la misma configuración para test y production.
// Ajusta según tus necesidades.
const test = { ...development };
const production = { ...development };

module.exports = {
  development,
  test,
  production
};

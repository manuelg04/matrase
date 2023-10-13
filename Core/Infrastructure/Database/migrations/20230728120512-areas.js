/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'areas',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.ENUM(
              'Control de trafico',
              'Asociados de negocio',
              'Operaciones',
              'Pagos y cobros',
              'Legalizaciones'
            )
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        },
        { transaction }
      );
      await queryInterface.bulkInsert(
        'areas',
        [
          {
            name: 'Control de trafico',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Asociados de negocio',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          { name: 'Operaciones', createdAt: new Date(), updatedAt: new Date() },
          {
            name: 'Pagos y cobros',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Legalizaciones',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        { transaction }
      );
    });
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('areas', { transaction });
    });
  }
};

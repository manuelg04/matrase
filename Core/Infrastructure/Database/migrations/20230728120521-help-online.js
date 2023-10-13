/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'help_online',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id'
            }
          },
          help_type: {
            type: Sequelize.ENUM(
              'Actualización de documentos',
              'Operaciones',
              'Pagos',
              'Control de tráfico'
            ),
            allowNull: false
          },
          chat_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'chats',
              key: 'id'
            }
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('help_online', { transaction });
    });
  }
};

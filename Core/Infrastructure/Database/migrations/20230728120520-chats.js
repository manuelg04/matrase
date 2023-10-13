'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'chats',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          users_id: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' }
          },
          novelties_id: {
            type: Sequelize.INTEGER,
            references: { model: 'novelties', key: 'id' }
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('chats', { transaction });
    });
  }
};

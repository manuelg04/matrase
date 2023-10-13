'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'areas_has_users',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          areas_id: {
            type: Sequelize.INTEGER,
            references: { model: 'areas', key: 'id' }
          },
          users_id: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' }
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
      await queryInterface.dropTable('areas_has_users', { transaction });
    });
  }
};

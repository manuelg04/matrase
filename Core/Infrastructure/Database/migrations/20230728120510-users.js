'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'users',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          code: {
            type: Sequelize.STRING
          },
          name: {
            type: Sequelize.STRING
          },
          last_name: {
            type: Sequelize.STRING
          },
          company_name: {
            type: Sequelize.STRING
          },
          company_code_cs: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING
          },
          password: {
            type: Sequelize.STRING
          },
          phone: {
            type: Sequelize.STRING
          },
          change_password: {
            type: Sequelize.INTEGER
          },
          third_party_code: {
            type: Sequelize.STRING
          },
          third_party_name: {
            type: Sequelize.STRING
          },
          type_user: {
            type: Sequelize.STRING
          },
          code_otp: {
            type: Sequelize.STRING
          },
          area: {
            type: Sequelize.STRING
          },
          role_id: {
            type: Sequelize.INTEGER,
            references: { model: 'roles', key: 'id' }
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
      await queryInterface.dropTable('users', { transaction });
    });
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'messages',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          messages: {
            type: Sequelize.TEXT
          },
          send_at: {
            type: Sequelize.DATE
          },
          status: {
            type: Sequelize.TINYINT
          },
          chats_id: {
            type: Sequelize.INTEGER,
            references: { model: 'chats', key: 'id' }
          },
          sender_id: {
            type: Sequelize.INTEGER
          },
          sender_type: {
            type: Sequelize.STRING
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
      await queryInterface.dropTable('messages', { transaction });
    });
  }
};

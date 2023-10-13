'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Agregar la columna help_online_id a la tabla chats
      await queryInterface.addColumn(
        'chats',
        'help_online_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'help_online',
            key: 'id'
          },
          allowNull: true
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Eliminar la columna help_online_id de la tabla chats
      await queryInterface.removeColumn('chats', 'help_online_id', {
        transaction
      });
    });
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'novelties',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.TEXT
          },
          image_path: {
            type: Sequelize.STRING
          },
          area_id: {
            type: Sequelize.INTEGER,
            references: { model: 'areas', key: 'id' }
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
      // Inserta solo los nombres de las 6 novedades
      await queryInterface.bulkInsert(
        'novelties',
        [
          { name: 'Tráfico', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Accidente', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Bloqueos', createdAt: new Date(), updatedAt: new Date() },
          {
            name: 'Falla técnica',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          { name: 'Llantas', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Derrumbes', createdAt: new Date(), updatedAt: new Date() }
        ],
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('novelties', { transaction });
    });
  }
};

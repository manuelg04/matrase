// migration-name.js (elige un nombre adecuado para la migración)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Inserta los datos
    const rolesData = [
      { name: 'administrador', createdAt: new Date(), updatedAt: new Date() },
      { name: 'conductor', createdAt: new Date(), updatedAt: new Date() },
      { name: 'propietario', createdAt: new Date(), updatedAt: new Date() },
      {
        name: 'propietario-conductor',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return await queryInterface.bulkInsert('roles', rolesData);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('roles');
  }
};

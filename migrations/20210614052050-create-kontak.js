'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kontaks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_kontak: {
        type: Sequelize.STRING
      },
      no_hp: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      id_tipe_kontak: {
        type: Sequelize.INTEGER
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('kontaks');
  }
};
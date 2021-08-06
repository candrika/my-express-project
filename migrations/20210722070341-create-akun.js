'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('akuns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_tipe_akun: {
        type: Sequelize.INTEGER
      },
      id_header: {
        type: Sequelize.INTEGER
      },
      nama_akun: {
        type: Sequelize.STRING
      },
      saldo_akun: {
        type: Sequelize.NUMERIC
      },
      deleted: {
        type: Sequelize.SMALLINT
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
    await queryInterface.dropTable('akuns');
  }
};
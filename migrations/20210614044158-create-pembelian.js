'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pembelians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_pembelian: {
        type: Sequelize.STRING
      },
      supplier: {
        type: Sequelize.INTEGER
      },
      nominal_pembelian: {
        type: Sequelize.DECIMAL
      },
      total_pembelian: {
        type: Sequelize.STRING
      },
      diskon: {
        type: Sequelize.DECIMAL
      },
      biaya_pengiriman: {
        type: Sequelize.DECIMAL
      },
      pajak_pembelian: {
        type: Sequelize.INTEGER
      },
      akun_pembelian: {
        type: Sequelize.INTEGER
      },
      harga_pajak: {
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
    await queryInterface.dropTable('pembelians');
  }
};
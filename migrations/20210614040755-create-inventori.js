'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventoris', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_barang: {
        type: Sequelize.STRING
      },
      no_barcode: {
        type: Sequelize.STRING
      },
      no_sku: {
        type: Sequelize.STRING
      },
      stock_tersedia: {
        type: Sequelize.INTEGER
      },
      di_beli: {
        type: Sequelize.SMALLINT
      },
      di_jual: {
        type: Sequelize.SMALLINT
      },
      harga_beli: {
        type: Sequelize.DECIMAL
      },
      harga_jual: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('inventoris');
  }
};
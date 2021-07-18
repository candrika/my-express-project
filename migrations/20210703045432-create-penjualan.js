'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('penjualans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode_penjualan: {
        type: Sequelize.STRING
      },
      kode_invoice: {
        type: Sequelize.STRING
      },
      sub_total: {
        type: Sequelize.NU
      },
      total: {
        type: Sequelize.DECIMAL
      },
      diskon: {
        type: Sequelize.DECIMAL
      },
      pajak: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      total_bayar: {
        type: Sequelize.DECIMAL
      },
      kembalian: {
        type: Sequelize.DECIMAL
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('penjualans');
  }
};
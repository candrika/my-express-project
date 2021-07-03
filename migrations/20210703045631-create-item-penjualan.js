'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('item_penjualans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      produk_id: {
        type: Sequelize.INTEGER
      },
      qty_penjualan: {
        type: Sequelize.INTEGER
      },
      harga: {
        type: Sequelize.INTEGER
      },id_penjualan:{
        type: Sequelize.INTEGER,
        
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
    await queryInterface.dropTable('item_penjualans');
  }
};
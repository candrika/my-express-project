'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_penjualan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      item_penjualan.belongsTo(models.inventori, {
        foreignKey: 'produk_id',
        as: 'inventori'
      });
    }
  };
  item_penjualan.init({
    produk_id: DataTypes.INTEGER,
    qty_penjualan: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    id_penjualan:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item_penjualan',
  });
  return item_penjualan;
};
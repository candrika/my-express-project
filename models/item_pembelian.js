'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_pembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  item_pembelian.init({
    qty: DataTypes.INTEGER,
    harga: DataTypes.DECIMAL,
    id_inventori: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item_pembelian',
  });
  return item_pembelian;
};
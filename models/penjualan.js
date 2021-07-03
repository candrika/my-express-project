'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penjualan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  penjualan.init({
    kode_penjualan: DataTypes.STRING,
    kode_invoice: DataTypes.STRING,
    sub_total: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    diskon: DataTypes.INTEGER,
    pajak: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'penjualan',
  });
  return penjualan;
};
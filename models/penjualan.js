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
    sub_total: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    diskon: DataTypes.DECIMAL,
    pajak: DataTypes.DECIMAL,
    total_bayar:DataTypes.DECIMAL,
    kembalian:DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'penjualan',
  });
  return penjualan;
};
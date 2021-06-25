'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pembelian.init({
    no_pembelian: DataTypes.STRING,
    supplier: DataTypes.INTEGER,
    nominal_pembelian: DataTypes.DECIMAL,
    total_pembelian: DataTypes.STRING,
    diskon: DataTypes.DECIMAL,
    biaya_pengiriman: DataTypes.DECIMAL,
    pajak_pembelian: DataTypes.INTEGER,
    akun_pembelian: DataTypes.INTEGER,
    harga_pajak: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'pembelian',
  });
  return pembelian;
};
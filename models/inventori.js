'use strict';
const {
  Model
} = require('sequelize');
const kartustok = require('./kartustok');
module.exports = (sequelize, DataTypes) => {
  class inventori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      inventori.hasOne(models.kartustok, {
        foreignKey: 'id',
        as: 'kartustok'
      });
    }
  };
  inventori.init({
    nama_barang: DataTypes.STRING,
    no_barcode: DataTypes.STRING,
    no_sku: DataTypes.STRING,
    stock_tersedia: DataTypes.INTEGER,
    di_beli: DataTypes.SMALLINT,
    di_jual: DataTypes.SMALLINT,
    harga_beli: DataTypes.DECIMAL,
    harga_jual: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'inventori',
  });
  return inventori;
};
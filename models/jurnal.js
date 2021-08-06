'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jurnal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  jurnal.init({
    memo: DataTypes.STRING,
    tanggal_jurnal: DataTypes.DATE,
    no_referensi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'jurnal',
  });
  return jurnal;
};
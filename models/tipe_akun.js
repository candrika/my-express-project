'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipe_akun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tipe_akun.hasOne(models.akun, {
        foreignKey: 'id',
        as:'tipe_akun'
      });
    }
  };
  tipe_akun.init({
    nama_tipe_akun: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipe_akun',
  });
  return tipe_akun;
};
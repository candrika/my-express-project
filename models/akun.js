'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class akun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      akun.belongsTo(models.tipe_akun, {
        foreignKey:'id_tipe_akun',
        as:'tipe_akun'
      })
    }
  };
  akun.init({
    id_tipe_akun: DataTypes.INTEGER,
    id_header: DataTypes.INTEGER,
    nama_akun: DataTypes.STRING,
    saldo_akun: DataTypes.NUMERIC,
    deleted: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'akun',
  });
  return akun;
};
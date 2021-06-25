'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipe_kontak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tipe_kontak.hasOne(models.kontak, {
        foreignKey: 'id',
        as: 'kontak'
      });
    }
  };
  tipe_kontak.init({
    jenis_kontak: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipe_kontak',
  });
  return tipe_kontak;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kontak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      kontak.belongsTo(models.tipe_kontak, {
        foreignKey: 'id_tipe_kontak',
        as:'tipe_kontak'
      })
    }
  };
  kontak.init({
    nama_kontak: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    alamat: DataTypes.STRING,
    email: DataTypes.STRING,
    id_tipe_kontak: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kontak',
  });
  return kontak;
};
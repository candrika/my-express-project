'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kartustok extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      kartustok.belongsTo(models.inventori, {
        foreignKey:'product_id',
        as:'inventori'
      })
    }
  };
  kartustok.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    tipe_transaksi: DataTypes.SMALLINT,
    qty_awal: DataTypes.INTEGER,
    qty_transaksi: DataTypes.INTEGER,
    qty_akhir: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'kartustok',
  });
  return kartustok;
};
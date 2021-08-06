'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    realname: DataTypes.STRING,
    last_login: DataTypes.DATE,
    deleted: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
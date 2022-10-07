'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Address.belongsTo(models.User,{
        as : "users",
        foreignKey: "userId"       
      })
    }
  }

  Address.init({
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    location: DataTypes.STRING,
    province: DataTypes.STRING,
    postalcode: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
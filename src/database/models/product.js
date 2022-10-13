'use strict';
const { CustomValidation } = require('express-validator/src/context-items');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
      Product.belongsTo(models.Category,{
        as : "category",
        foreignKey : "categoryId"
      })
      Product.hasMany(models.Image,{
        as : "images",
        foreignKey : "productId"
      })
      Product.belongsToMany(models.Color,{
        foreignKey : "productsId",
        otherKey : "colorId",
        through : "Stocks",
        as : "colors"
      })
      Product.hasMany(models.Stock,{
        as : "stock",
        foreignKey : "productId"
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    paranoid : true
  });
  return Product;
};


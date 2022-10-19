"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Color.belongsToMany(models.Product, {
        foreignKey: "colorId",
        otherKey: "productId",
        through: "stocks",
        as: "products",
        onDelete: "cascade",
      });
    }
  }
  Color.init(
    {
      name: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Color",
    }
  );
  return Color;
};

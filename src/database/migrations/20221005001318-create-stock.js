"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Stocks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      colorId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName : "Colors"
          },
          key : "id"
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : "Products"
          },
          key : "id",
          onDelete : 'cascade'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Stocks");
  },
};

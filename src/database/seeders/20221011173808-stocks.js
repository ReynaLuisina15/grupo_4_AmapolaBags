'use strict';

const stocksDB = require('../../data/stock.json');
 
const stocks = stocksDB.map(({quantity},index) => {
  return{
    quantity : quantity,
    productId : index + 1,
    colorId : index + 1,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Stocks', stocks, {});
   
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Stocks', null, {});
     
  }
};
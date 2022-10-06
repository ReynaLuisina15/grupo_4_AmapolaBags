'use strict';

const addressesDB = require('../../data/addresses.json');
 
const addresses = addressesDB.map(address => {
  return{
    ...address,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Addresses', addresses, {});
   
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Addresses', null, {});
     
  }
};

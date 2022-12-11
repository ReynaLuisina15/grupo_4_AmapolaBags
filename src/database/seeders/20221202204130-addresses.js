'use strict';
const addresses = [];

 for (let i = 1; i <= 5; i++) {
  addresses.push({
    userId:i,
    createdAt : new Date()
  })
 }


module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Addresses', addresses, {});
   
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Addresses', null, {});
     
  }
};

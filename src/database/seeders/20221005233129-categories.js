'use strict';

const categories = [
  { 
    name : 'Mochilas',
    createdAt : new Date()
  },
  {
    name : 'Riñoneras',
    createdAt : new Date()
  },
  {
    name : 'Carteras',
    createdAt : new Date()
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Categories', categories, {});
   
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
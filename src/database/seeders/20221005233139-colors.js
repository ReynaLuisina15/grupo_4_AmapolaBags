'use strict';

const colorsDB = require('../../data/colors.json');
 
const colors = colorsDB.map(({name},index) => {
  return{
    name, 
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Colors', colors, {});
   
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Colors', null, {});
     
  }
};

'use strict';

const {hashSync} = require('bcryptjs');
 
const estados = ["pendiente","finalizado","cancelado"];

const statuses = estados.map(status => ({
  name : status,
  createdAt : new Date()
}))

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Statuses', statuses, {});
   
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Statuses', null, {});
     
  }
};
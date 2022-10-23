'use strict';

const colors = [
  { 
    name: "Rosa",
    hexa: "#cd858d",
    createdAt : new Date()
  },
  {
    name: "Marron claro",
    hexa: "#ecd6c0",
    createdAt : new Date()
  },
  {
    name: "Marron oscuro",
    hexa: "#bf9780",
    createdAt : new Date()
  },
  {
    name: "Negro",
    hexa: "#000000",
    createdAt : new Date()
  },
  {
    name: "Gris claro",
    hexa: "#aaaaaa",
    createdAt : new Date()
  },
  {
    name: "Gris oscuro",
    hexa: "#45484a",
    createdAt : new Date()
  },
  {
    name: "Blanco",
    hexa: "#f8f8f8",
    createdAt : new Date()
  },
  {
    name: "Rojo",
    hexa: "#ff0000",
    createdAt : new Date()
  },
  {
    name: "Amarillo",
    hexa: "#f6ec35",
    createdAt : new Date()
  },
  {
    name: "Verde",
    hexa: "#008000",
    createdAt : new Date()
  },
  {
    name: "Azul",
    hexa: "#000ff",
    createdAt : new Date()
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Colors', colors, {});
   
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Colors', null, {});
     
  }
};

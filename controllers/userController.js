const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

module.exports = {
  login : (req,res) => {
    return res.render("login", {title:"Perfil"})
  },
  register : (req,res) => {
    return res.render("register", {title:"Registro"})
  },
}
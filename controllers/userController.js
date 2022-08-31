const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

module.exports = {
  login : (req,res) => {
    return res.render("login", {title:"Perfil"})
  },
  proccesLogin : (req, res) => {
    return res.render("index", {title:"index"})
  },
  register : (req,res) => {
    return res.render("register", {title:"Registro"})
  }, 
}
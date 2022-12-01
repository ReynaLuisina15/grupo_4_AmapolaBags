/* const {check,body} = require("express-validator");
const db = require ("../database/models");


module.exports = [
  check("name")
    .notEmpty().withMessage('el nombre es obligatorio').bail()
    .isAlpha('es-ES').withMessage('solo letras!!!').bail()
    .isLength({
      min: 2
    }).withMessage('como minimo 2 caracteres'),
  
  check("surname")
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isAlpha('es-ES').withMessage('Solo letras!!!').bail()
    .isLength({
        min : 2
    }).withMessage('Como mínimo 2 caracteres'),

  check("email")
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email válido').bail()
    .custom((value, {req}) => {
        let db = db.User.findOne(user => user.email === value.trim());
       return !!!user;
    }).withMessage('El email ya se encuentra registrado'),  

] */
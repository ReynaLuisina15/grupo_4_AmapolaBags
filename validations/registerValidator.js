const {check,body} = require("express-validator");
const users = require('../data/db').loadUsers();

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
        let user = users.find(user => user.email === value.trim());
       return !!!user;
    }).withMessage('El email ya se encuentra registrado'),  

  body("password")
    .notEmpty().withMessage('La contraseña es obligatorio').bail()
    .isLength({
        min : 6,
        max : 12
    }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

  check("terms")
    .isString("on").withMessage("debes aceptar las bases y condiciones")
]
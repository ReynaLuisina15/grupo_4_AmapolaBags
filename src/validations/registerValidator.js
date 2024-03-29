const {check,body} = require("express-validator");
const db = require('../database/models');

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
    .custom((value) => {
      return db.User.findOne({
        where: {
          email: value
        }
      }).then((user) => {
        if(user) {
          return Promise.reject('El email ya existe')
        }
      })     
    }).withMessage('El email ya se encuentra registrado'),  

  body("password")
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({
        min : 6,
        max : 12
    }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

  check("terms")
    .isString("on").withMessage("debes aceptar las bases y condiciones")
]
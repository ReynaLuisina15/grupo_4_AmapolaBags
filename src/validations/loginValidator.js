const db = require('../database/models')
const {check,body} = require("express-validator");
const users = require('../data/db').loadUsers();
const bcryptjs = require('bcryptjs');

module.exports = [
  check("email")
    .notEmpty().withMessage('el email es obligatorio').bail()
    .isEmail().withMessage('debe ser un email valido'),

  body("password")
    .notEmpty().withMessage('la contraseña es obligatoria').bail()
    .custom((value, {req}) => {
      return db.User.findOne({
        where :{
            email : req.body.email
        }
    }).then(user => {
        if(!user || !bcryptjs.compareSync(value, user.password)){
            return Promise.reject()
        }
    }).catch( () => Promise.reject('Credenciales inválidas'))
      }).withMessage('credenciales invalidas').bail()
]
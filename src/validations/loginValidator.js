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
      let user = users.find(user => user.email === req.body.email.trim() && bcryptjs.compareSync(value, user.password));
      return !!user
    }).withMessage('credenciales invalidas').bail()
]
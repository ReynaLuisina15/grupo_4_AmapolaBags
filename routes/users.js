var express = require('express');
var router = express.Router();

const {login, register, proccesLogin, processRegister, processProfile} = require("../controllers/userController");
const {loginValidator, registerValidator} = require('../validations');

/* user. */
router
      /*USER REGISTER */
     .get('/register', register)
     .post('/register', registerValidator, processRegister)

     /* user Login. */
     .get('/login', login)
     .post('/login', loginValidator, proccesLogin)


     /* USER PROFILE */
     .get('/profile', processProfile)

module.exports = router;

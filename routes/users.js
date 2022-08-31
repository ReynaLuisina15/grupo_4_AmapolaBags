var express = require('express');
var router = express.Router();

const {login, register, proccesLogin, processRegister} = require("../controllers/userController");

/* user. */
router
      /*USER REGISTER */
     .get('/register', register)
     .post('/register', processRegister)

     /* user Login. */
     .get('/login', login)
     .post('/login', proccesLogin)

module.exports = router;

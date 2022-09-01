var express = require('express');
var router = express.Router();

const {login, register, proccesLogin, processRegister, processProfile} = require("../controllers/userController");

/* user. */
router
      /*USER REGISTER */
     .get('/register', register)
     .post('/register', processRegister)

     /* user Login. */
     .get('/login', login)
     .post('/login', proccesLogin)

     /* USER PROFILE */
     .get('/profile', processProfile)

module.exports = router;

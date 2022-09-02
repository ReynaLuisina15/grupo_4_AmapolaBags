var express = require('express');
var router = express.Router();

const {login, register, proccesLogin, processRegister, profile} = require("../controllers/userController");
const {loginValidator, registerValidator} = require('../validations');
const {uploadImageUser} = require("../middlewares/upLoadFiles");

/* user. */
router
      /*USER REGISTER */
     .get('/register', register)
     .post('/register', uploadImageUser.single("img"), registerValidator, processRegister)

     /* user Login. */
     .get('/login', login)
     .post('/login', loginValidator, proccesLogin)


     /* USER PROFILE */
     .get('/profile', profile)

module.exports = router;

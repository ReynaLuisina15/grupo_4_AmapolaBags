var express = require('express');
var router = express.Router();

const {login, register, processLogin, processRegister, profile,logout, update, processUpdate} = require("../controllers/userController");
const {loginValidator, registerValidator, userEditValidator} = require('../validations');
const {uploadImageUser} = require("../middlewares/upLoadFiles");


/* user. */
router
      /*USER REGISTER */
     .get('/register', register)
     .post('/register', uploadImageUser.single("img"), registerValidator, processRegister)

     /* user Login. */
     .get('/login', login)
     .post('/login',  loginValidator, processLogin)

     /* USER PROFILE */
     .get('/profile', profile)
     .get('/logout', logout)

     .get('/userEdit', update)
     .put('/userEdit',  processUpdate)
module.exports = router;

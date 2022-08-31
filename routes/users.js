var express = require('express');
var router = express.Router();

const {login, register, proccesLogin} = require("../controllers/userController");

/* user. */
router
     .get('/register', register)

     /* user Login. */
     .get('/login', login)
     .post('/login', proccesLogin)

module.exports = router;

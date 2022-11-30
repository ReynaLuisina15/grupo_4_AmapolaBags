const express = require("express");
const router = express.Router();

// -------- CONTROLLER REQUIRE
const {
    image,
    list, 
    detail, 
    register,
} = require("../../controllers/APIs/apisUsersController");

 router
    .get('/', list)
    .get('/:id', detail)
    .get('/image/:img', image)
    .post('/register', register)
    //.patch('/update', update)
    //.post('/login', login)

module.exports = router

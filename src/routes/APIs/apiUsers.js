const express = require("express");
const router = express.Router();

// -------- CONTROLLER REQUIRE
const {
    image,
    list, 
    detail, 
    register,
    destroy,
} = require("../../controllers/APIs/apisUsersController");

 router
    .get('/', list)
    .get('/:id', detail)
    .get('/image/:img', image)
    .post('/register', register)
    .delete('/delete/:id', destroy)
    //.put('/edit/:id', edit)
    //.post('/login', login)

module.exports = router

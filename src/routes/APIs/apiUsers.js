const express = require("express");
const router = express.Router();

// -------- CONTROLLER REQUIRE
const {
    image,
    list, 
    detail
} = require("../../controllers/APIs/apisUsersController");

 router
    .get('/', list)
    .get('/:id', detail)
    .get('/image/:img', image)

module.exports = router

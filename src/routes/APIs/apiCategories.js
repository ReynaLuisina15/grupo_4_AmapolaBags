const express = require("express");
const router = express.Router();


// -------- CONTROLLER REQUIRE
const {
    list
} = require("../../controllers/APIs/apiCategoriesController");

 router
    .get('/', list)
    

module.exports = router
const express = require("express");
const router = express.Router();

// -------- CONTROLLER REQUIRE
const {
    totals
} = require("../../controllers/APIs/apiMainController");

 router
    .get('/totals', totals)
    

module.exports = router
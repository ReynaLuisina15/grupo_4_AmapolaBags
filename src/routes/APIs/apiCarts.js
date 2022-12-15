const express = require("express");
const router = express.Router();

// -------- CONTROLLER REQUIRE
const {  
    list, 
    addItem, 
    removeItem,
    removeAllItem
} = require("../../controllers/APIs/apiCartsController");

 router
    .get('/', list)
    .post('/', addItem)
    .delete('/all/:id', removeAllItem)
    .delete('/:id', removeItem)
    

module.exports = router;
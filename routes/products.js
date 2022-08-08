var express = require('express');
var router = express.Router();

const {productCart,productDetail,productGeneral,productAdd,productEdit} = require("../controllers/productsController");

/* products. */
router
     .get('/productDetail', productDetail)
     .get('/productCart', productCart)
     .get('/productGeneral', productGeneral)
     .get('/productAdd', productAdd)
     .get('/productEdit', productEdit);
     
module.exports = router;
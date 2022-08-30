const express = require('express');
const router = express.Router();


const {cart,detail,general,add,edit,store,update,destroy} = require("../controllers/productsController");

const {productsAddValidator,productsEditValidator} = require("../validations")


const {uploadImageProduct} = require("../middlewares/upLoadFiles")

/* products. */
router
     .get('/productAdd', add)
     .post('/productAdd',uploadImageProduct.single("img"),/* uploadImageProduct.array("img"), */ productsAddValidator, store)

     .get('/productDetail/:id', detail)

     .get('/productEdit/:id', edit)
     .put('/update/:id',uploadImageProduct.single("img"),productsEditValidator, update)


     .delete('/delete/:id', destroy)
     
     .get('/productCart', cart)
     .get('/productGeneral', general) 
     
     
module.exports = router;
     
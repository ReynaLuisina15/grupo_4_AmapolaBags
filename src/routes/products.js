const express = require('express');
const router = express.Router();


const {cart,detail,general,add,edit,store,update,destroy,purse,fannyPack, backpack} = require("../controllers/productsController");

const {productsAddValidator,productsEditValidator} = require("../validations")
const adminUserCheck = require("../middlewares/adminUserCheck")

const {uploadImageProduct} = require("../middlewares/upLoadFiles")



/* products. */
router
     .get('/productAdd',adminUserCheck, add)
     .post('/productAdd',adminUserCheck, uploadImageProduct.single("img"),/* uploadImageProduct.array("img"), */ productsAddValidator, store)

     .get('/productDetail/:id', detail)

     .get('/productEdit/:id',adminUserCheck, edit)
     .put('/update/:id',adminUserCheck, uploadImageProduct.single("img"),productsEditValidator, update)


     .delete('/delete/:id',adminUserCheck, destroy)
     
     .get('/productCart', cart)
     .get('/productGeneral', general) 

     .get('/productPurse', purse) /* carteras */
     .get('/productFannyPack', fannyPack) /* riñoneras */
     .get('/productBackpack', backpack)
     
     
module.exports = router;
     
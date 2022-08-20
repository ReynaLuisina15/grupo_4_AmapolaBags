const express = require('express');
const router = express.Router();


const {cart,detail,general,add,edit,store,update,destroy} = require("../controllers/productsController");

/* products. */
router
     .get('/productAdd', add)
     .post('/productAdd', store)

     .get('/productDetail/:id', detail)

     .get('/productEdit/:id', edit)
     .put('/update/:id', update)

     .delete('/destroy/:id', destroy)
     
     .get('/productCart', cart)
     .get('/productGeneral', general) 
     
     
module.exports = router;
     
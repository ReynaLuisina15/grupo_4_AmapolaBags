const express = require("express");
const router = express.Router();

// -------- CONTROLLER REQUIRE
const {
   image,
   all, 
   detail,
   category,
   store,
   update,
   destroy
} = require("../../controllers/APIs/apisProductsController");
const { uploadImageProduct } = require("../../middlewares/upLoadFiles");

 router
       .get("/image/:img", image)
       .get("/", all)
       .get("/category", category)
       .get("/:id", detail)
       .post("/",uploadImageProduct.fields([{name:"img1"},{name:"img2"}]), store)
       .patch("/:id",uploadImageProduct.fields([{name:"img1"},{name:"img2"}]), update)
       .delete("/:id", destroy)

module.exports = router    
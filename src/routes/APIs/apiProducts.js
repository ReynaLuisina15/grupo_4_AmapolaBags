const express = require("express");
const router = express.Router();

// -------- CONTROLLER REQUIRE
const {
   image,
   all, 
   detail,
   category,
   store
} = require("../../controllers/APIs/apisProductsController");
const { uploadImageProduct } = require("../../middlewares/upLoadFiles");

 router
       .get("/image/:img", image)
       .get("/", all)
       .get("/category", category)
       .get("/:id", detail)
       .post("/",uploadImageProduct.array("images"), store)
    // .patch("/:id",update)
    // .delete("/:id,destroy")

module.exports = router    
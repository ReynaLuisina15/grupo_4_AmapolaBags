const express = require("express");
const router = express.Router();

// -------- CONTROLLER REQUIRE
const {
   image,
   all, 
   detail,
   category
} = require("../../controllers/APIs/apisProductsController");

 router
       .get("/image/:img", image)
       .get("/", all)
       .get("/category", category)
       .get("/:id", detail)
       .post("/,store")
    // .patch("/:id",update)
    // .delete("/:id,destroy")

module.exports = router    
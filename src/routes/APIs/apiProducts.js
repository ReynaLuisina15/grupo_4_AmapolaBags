const express = require("express");
const router = express.Router();

// -------- CONTROLLER REQUIRE
const {
   image,
   all, 
   detail,
   store,
   update,
   destroy
} = require("../../controllers/APIs/apisProductsController");

 router
       .get("/image/:img", image)
       .get("/", all)
       .get("/:id", detail)
       .post("/", store)
       .patch("/:id",update)
       .delete("/:id", destroy) 

module.exports = router    
const {check,body} = require("express-validator");

module.exports = [
    check("name")
      .notEmpty()
      .withMessage("el nombre de producto es obligatorio").bail()
      .isLength({
        min : 4,
        max : 12
      }).withMessage("el nombre debe tener entr 4 y 12 caracteres"),

    check("category")
      .notEmpty()
      .withMessage("la categoria del producto es obligatoria"),
    
  /*   body("img")
      .custom((value,{req}) => {
        if(req.files[0]){
          return true
        }else{
          return false
        }
      })
      .withMessage("la imagen del producto es obligatorio"), */

    check("color")
      .notEmpty()
      .withMessage("el color del producto es obligatorio"),

    check("description")
      .notEmpty()
      .withMessage("la descripcion del producto es obligatorio"),

    check("price")
      .notEmpty()
      .withMessage("el precio del producto es obligatorio")
      .isNumeric({
         no_symbols: true
      }).withMessage("solo números positivos"),
    ]
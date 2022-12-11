const {check,body} = require("express-validator");

module.exports = [
    check("name")
        .notEmpty()
        .withMessage("el nombre de producto es obligatorio").bail()
        .isLength({
            min : 3,
            max : 12
        }).withMessage("el nombre debe tener entre 3 y 12 caracteres"),

    check("category")
        .notEmpty()
        .withMessage("la categoria del producto es obligatoria"),
    
   body("img")
    .custom((value,{req}) => {
      const regImg = /(.jpg|.png|.jpeg|.webp)$/
    
        if(regImg.test(req.files.img1[0].filename)){ 
          return true
        }else{
          return false
        }
     
        
      /* if(regImg.test(req.file?.filename)){ 
        return true
      }else{
        return false
      }
      return !!regImg.test(req.file?.filename) */ 
    })
    .withMessage("formato invalido"),    
        

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

const { check, body } = require("express-validator");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("el nombre de producto es obligatorio").bail()
    .isLength({
      min: 3,
      max: 16
    }).withMessage("El nombre del producto debe tener entre 3 y 12 caracteres"),
  check("category")
    .notEmpty()
    .withMessage("la categoria del producto es obligatoria"),

  check("color")
    .notEmpty()
    .withMessage("el color del producto es obligatorio"),

  /* check("img")
  .notEmpty()
  .custom((value,{req}) => {
    const regImg = /(.jpg|.png|.jpeg|.webp)$/
    req.files?.forEach(file => {
      if(regImg.test(file.filename)){ 
        return true
      }else{
        return false
      }
    }) 
    if(regImg.test(req.file?.filename)){ 
      return true
    }else{
      return false
    }
    return !!regImg.test(req.file?.filename) 
  })
  .withMessage("formato invalido"), */

  check("description")
    .notEmpty()
    .withMessage("la descripcion del producto es obligatorio")
    .isLength({
      min: 20,
      max: 300
    }).withMessage("La descrición del producto debe tener minimo 20 caracteres"),

  check("price")
    .notEmpty()
    .withMessage("el precio del producto es obligatorio")
    .isNumeric({
      no_symbols: true
    }).withMessage("solo números positivos")]

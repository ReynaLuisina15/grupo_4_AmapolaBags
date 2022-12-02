const {check, body} = require("express-validator");


exRegPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,12}$/ ;


module.exports = [
  check("name")
    .notEmpty().withMessage('el nombre es obligatorio').bail()
    .isAlpha('es-ES').withMessage('sólo carácteres alfabéticos').bail()
    .isLength({
      min: 2
    }).withMessage('El nombre debe tener como mínimo 2 carácteres'),


  
  check("surname")
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isAlpha('es-ES').withMessage('sólo carácteres alfabéticos').bail()
    .isLength({
        min : 2
    }).withMessage('El apellido debe tener como mínimo 2 carácteres'),


    check("street")
    .notEmpty().withMessage('La calle es obligatoria').bail()
    .isAlpha('es-ES').withMessage('sólo carácteres alfabéticos').bail(),
  

    check("number")
    .notEmpty().withMessage('El número de calle es obligatorio').bail()
    .isInt().bail(),


    check("location")
    .notEmpty().withMessage('La localidad es obligatoria').bail()
    .isAlpha('es-ES').withMessage('sólo carácteres alfabéticos').bail(),
   

    check("province")
    .notEmpty().withMessage('La provincia es obligatoria').bail()
    .isAlpha('es-ES').withMessage('sólo carácteres alfabéticos').bail(),


    check("postalcode")
    .notEmpty().withMessage('El código postal es obligatorio').bail()
    .isInt().bail(),

 

]
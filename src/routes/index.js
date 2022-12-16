var express = require('express');
var router = express.Router();

const {index, sobreNosotros} = require("../controllers/indexController")

/* / */
router
  .get('/', index)

  .get('/location', sobreNosotros)


module.exports = router;

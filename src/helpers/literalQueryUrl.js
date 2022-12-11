const {literal} = require("sequelize");
                            
const literalQueryUrl = ({req, field, alias, pathRoute = ''}) => { 
  const url = `${req.protocol}://${req.get("host")}${pathRoute}`

  return [literal(`CONCAT( '${url}',${field} )`),alias]
}

module.exports = {literalQueryUrl}

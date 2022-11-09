const mapped = (errors = []) => { 
  return errors.reduce((acum,error) => {
    acum = {...acum,[error.path]:error.message}
    return acum 
  },{})
}

const sendJsonError = (err,res,codeStatus = /Sequelize/i.test(err.name) ? 422 : 500) => { 
  
    let prop = "error"
    let responseError; // cambia segun el error
    if(/Sequelize/i.test(err.name) && Array.isArray(err.errors)){ // si el error de sequelize es un array agregame una s prop += "s"
       prop += "s"
       responseError = mapped(err.errors) // responseError mapea el error
    }
    if (err.message) {
        responseError = err.message
    }
   
    if(typeof err === "string"){ // si el error es un string mande el err == string
       responseError = err
    }
    return res.status(codeStatus).json({
        ok: false,
        status: codeStatus,
        [prop]: responseError,
    });
}

module.exports = {
    sendJsonError
}
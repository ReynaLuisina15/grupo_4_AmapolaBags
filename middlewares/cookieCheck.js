module.exports = (req,res,next) => {
    if(req.cookies.amapola){
        req.session.userLogin = req.cookies.amapola
    }
    next()
}
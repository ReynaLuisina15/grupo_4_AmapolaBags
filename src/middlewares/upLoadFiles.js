const path = require('path');
const multer = require('multer');

const storageImageProduct = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img' )
    },
    filename : (req,file,callback) => {
        callback(null,'product-' + Date.now() + path.extname(file.originalname))
       
    }
});

const uploadImageProduct = multer({
    storage : storageImageProduct
});

const storageImageUser = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img/avatar' )
    },
    filename : (req,file,callback) => {
        callback(null,'user-' + Date.now() + path.extname(file.originalname))
       
    }
});

const uploadImageUser = multer({
    storage : storageImageUser
});

module.exports = {
    uploadImageProduct,
    uploadImageUser
}
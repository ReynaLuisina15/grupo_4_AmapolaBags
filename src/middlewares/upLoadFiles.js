const path = require('path');
const multer = require('multer');
const db = require("../database/models");


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

/* const createStorage = (entityOrFolderName) => {
   folder = path.join(__dirname, `../../public/img/${entityOrFolderName}`)

   if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
    
   }

   const storage = multer.diskStorage({
    destination: (req ,file , callback) => {
        callback(null, `../../public/img/${entityOrFolderName}`)
    },
    filename: (req, file, callback) => {
        callback(null,`${entityOrFolderName}--${Date.now()}--${file.originalname}`)
    }
   })

   const uploads = {}
   uploads = [entityOrFolderName] = multer({
    storage
   })

   return uploads [entityOrFolderName] */

  

    
    
    
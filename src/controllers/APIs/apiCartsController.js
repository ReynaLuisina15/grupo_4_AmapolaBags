const db = require("../../database/models")

module.exports = {
    list: async (req,res) => {
     try {
        return res.status(200).json({
         ok : true,
         data : req.session.orderCart || null
        });
     } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || "Ups, un error"
        });
     }
    },
    addItem: async (req,res) => {
     try {
        const {productId} = req.body;

       const newProduct = await db.Cart.create({
            quantity : 1,
            productId,
            orderId : req.session.orderCart.id
        });

        let {id,name,price,imgPrimary} = await db.Product.findByPk(productId,{
            include : ["images"]
        });

        req.session.orderCart = {
            ...req.session.orderCart,
            products : [
                ...req.session.orderCart.products,
                {
                  id,
                  name,
                  price,
                  imgPrimary
                }
            ]
        }
        return res.status(200).json({
            ok : true,
            data : req.session.orderCart || null
           });
        
     } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || "Ups, un error"
        })
     }
    },
    removeItem: async (req,res) => {

    },
    removeAllItem: async (req,res) => {

    }
}
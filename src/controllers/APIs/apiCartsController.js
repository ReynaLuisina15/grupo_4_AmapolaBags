const db = require("../../database/models")

module.exports = {
    list: async (req,res) => {
     try {
        return res.status(200).json({
         ok : true,
         data : req.session.orderCart || null
        })
     } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || "Upps, un error"
        })
     }
    },
    addItem: async (req,res) => {

    },
    removeItem: async (req,res) => {

    },
    removeAllItem: async (req,res) => {

    }
}
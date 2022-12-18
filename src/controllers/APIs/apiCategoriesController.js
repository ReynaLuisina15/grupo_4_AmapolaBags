const db = require('../../database/models');
const {sendJsonError} = require("../../helpers/sendJsonError");
module.exports = {
    list : async (req,res) => {
        try {
            let categories = await db.Category.findAll()

            return res.status(200).json({
                ok : true,
                data : categories
            })
        } catch (error) {
            sendJsonError(error,res)
        }
    },
    detail : (req,res) => {

    },
    store : (req,res) => {

    },
    update : (req,res) => {

    },
    remove : (req,res) => {

    }
}
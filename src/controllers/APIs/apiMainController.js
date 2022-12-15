const db = require('../../database/models');

module.exports = {
    totals : async (req,res) => {
        try {

            const totalProducts = await db.Product.count();
            const totalUsers = await db.User.count();
            const totalCategories = await db.Category.count();

            return res.status(200).json({
                ok : true,
                data : {
                    totalCategories,
                    totalProducts,
                    totalUsers
                }
            })

            
        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Comunicate con el administrador'
            })
        }
    }
}
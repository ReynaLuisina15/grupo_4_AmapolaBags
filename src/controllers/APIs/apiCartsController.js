const db = require("../../database/models");

module.exports = {
  list: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        data: req.session.orderCart || null,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Ups, un error",
      });
    }
  },
  addItem: async (req, res) => {
    console.log("###########", req.body);
    try {
      const { productId } = req.body;

      const newCartItem = await db.Cart.create({
        quantity: 1,
        productId: +productId,
        orderId: req.session.orderCart.id,
      });

      console.log("linea 28");
      const cartItem = await newCartItem.reload({
        include: [
          {
            association: "product",
            include: ["images"],
          },
        ],
      }); /* await db.cart.findByPk(newCartItem.id, {
            include:[
                {
                    association: 'product',
                    include : ['images']
                }
            ]
        }) */

        console.log("CART ITEM PRODUCT", cartItem);
      const { id, name, price, imgPrimary } = cartItem.dataValues.product;

      req.session.orderCart = {
        ...req.session.orderCart,
        products: [
          ...req.session.orderCart.products,
          {
            id,
            name,
            price,
            imgPrimary,
            quantity: cartItem.quantity,
          },
        ],
      };

      return res.status(200).json({
        ok: true,
        data: req.session.orderCart || null,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Ups, un error",
      });
    }
  },
  removeItem: async (req, res) => {},
  removeAllItem: async (req, res) => {},
};

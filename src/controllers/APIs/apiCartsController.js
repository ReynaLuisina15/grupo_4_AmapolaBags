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

      const newCart = await db.Cart.create({
        quantity: 1,
        productId,
        orderId: req.session.orderCart.id,
      });

      const cartItem = await db.Cart.findByPk(newCart.id, {
        include: { association: "product", include: ["images"] },
      });

      console.log("cartItem", cartItem);
      const {
        product: { id, name, price, imgPrimary },
      } = cartItem;

      req.session.orderCart = {
        ...req.session.orderCart,
        items: [
          ...(req.session.orderCart.items ? req.session.orderCart.items : []),
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

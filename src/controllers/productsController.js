const db = require("../database/models");
/* const { loadProducts, storeProducts } = require("../data/produtcsModule"); */
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const fs = require("fs");
const { Op } = require("sequelize");
/* const products = require('../data/productsDataBase.json') */

const { validationResult } = require("express-validator");

const controller = {
  cart: (req, res) => {
    return res.render("productCart", { title: "Carrito" });
  },

  general: (req, res) => {
    /* const products = loadProducts();
    ); */
    db.Product.findAll({
      include: [
        "images",
        {
          association: "stock",
          attributes: ["quantity", "productId", "colorId"],
          include: [
            {
              association: "color",
              attributes: ["name"],
            },
          ],
        },
      ],
    }).then((products) => {
      /*return res.send(products) */
      return res.render("productGeneral", {
        products,
        toThousand,
      });
    });
  },

  purse: (req, res) => {
    let purse = db.Category.findByPk(3, {
      include: [
        {
          association: "products",
          include: ["images", "stock"],
        },
      ],
    })
      .then((purse) => {
        /* return res.send(purse)  */
        return res.render("productPurse", {
          purse,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },

  fannyPack: (req, res) => {
    let fannyPack = db.Category.findByPk(2, {
      include: [
        {
          association: "products",
          include: ["images"],
        },
      ],
    })
      .then((fannyPack) => {
        return res.render("productfannyPack", {
          fannyPack,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },
  backpack: (req, res) => {
    let backpack = db.Category.findByPk(1, {
      include: [
        {
          association: "products",
          include: ["images"],
        },
      ],
    })
      .then((backpack) => {
        return res.render("productbackpack", {
          backpack,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },

  detail: (req, res) => {
    /*  const products = loadProducts();
    const product = products.find((product) => product.id === +req.params.id);
    

    return res.render("productDetail", {
      product,
      toThousand,
    }); */
    db.Product.findByPk(req.params.id, {
      include: [
        "images",
        {
          association: "stock",
          attributes: ["quantity", "productId", "colorId"],
          include: [
            {
              association: "color",
              attributes: ["name"],
            },
          ],
        },
      ],
    })
      .then((product) => {
        /* return res.send(product) */
        res.render("productDetail", {
          product,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },

  add: (req, res) => {
    let categories = db.Category.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    let colors = db.Color.findAll({
      order: ["name"],
    });
    let product = db.Product.findByPk(req.params.id);
    Promise.all([categories, colors, product]).then(
      ([categories, colors, product]) => {
        return res.render("productAdd", {
          product,
          categories,
          colors,
        });
      }
    );
  },

  store: async (req, res) => {
    /* CREAR */
    const imagesMulter = req.files;
    /*return res.send(imagesMulter)*/
    try {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        const {
          name,
          price,
          description,
          category,
          color,
          quantity = 10,
        } = req.body;

        let product = await db.Product.create({
          name,
          price,
          description,
          categoryId: category,
        });
        let stock = await db.Stock.create({
          quantity,
          colorId: color,
          productId: product.id,
        });

        let images = [{ file: "default.png", productId: product.id }];

        if (imagesMulter.length) {
          images = imagesMulter.map((image) => {
            return {
              file: image.filename,
              productId: product.id,
            };
          });
        }

        await db.Image.bulkCreate(images, {
          validate: true,
        });
        /* return res.send(req.files) */
        return res.redirect("/products/productGeneral");
      } else {
        db.Color.findAll({
          order: ["name"],
        }).then((colors) => {
          res.render("productAdd", {
            errors: errors.mapped(),
            old: req.body,
            colors,
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  edit: (req, res) => {
    let categories = db.Category.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    let colors = db.Color.findAll({
      order: ["name"],
    });
    let product = db.Product.findByPk(req.params.id);

    Promise.all([categories, product, colors])
      .then(([categories, product, colors]) => {
        /*  return res.send(colors) */
        return res.render("productEdit", {
          product,
          categories,
          colors,
        });
      })
      .catch((error) => console.log(error));
  },

  update: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        const {
          name,
          price,
          category,
          description,
          color,
          quantity = 10,
        } = req.body;

        let product = await db.Product.findByPk(req.params.id, {
          include: ["images"],
        });
        let stock = await db.Stock.findOne({
          where: {
            productId: product.id,
          },
        });

        product.name = name.trim();
        product.price = price;
        product.description = description.trim();
        product.categoryId = category;

        await product.save();

        stock.quantity = quantity;
        stock.colorId = color;

        await stock.save();

        // si se cargan nuevas imagenes
        if (req.files.length) {
          let imagesNew = req.files.map((image) => {
            return {
              file: image.filename,
              productId: product.id,
            };
          });

          // Se borran las images anteriores
          product.images.forEach(async (image) => {
            fs.unlink(`./public/img/${image.file}`);

            await db.Image.destroy({
              where: {
                file: image.file,
              },
            });
          });

          // guardo en db las nuevas imagenes
          await db.Image.bulkCreate(imagesNew);
        }
        return res.redirect("/products/productDetail/" + req.params.id);
      } else {
        db.Color.findAll({
          order: ["name"],
        }).then((colors) => {
          res.render("productAdd", {
            errors: errors.mapped(),
            old: req.body,
            colors,
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  destroy: (req, res) => {
    const id = req.params.id;
    const products = loadProducts();
    const productsModify = products.filter((product) => product.id !== +id);
    storeProducts(productsModify);
    return res.redirect("/products/productGeneral");
  },
  search: (req, res) => {
    const { keywords } = req.query;
    db.Product.findAll({
      include: ["images", "category"],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: keywords,
            },
          },
          {
            description: {
              [Op.substring]: keywords,
            },
          },
          {
            "$category.name$": {
              [Op.substring]: keywords,
            },
          },
        ],
      },
    })

      .then((products) => {
        return res.render("productGeneral", {
          title: "initSearch",
          products,
          keywords,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },
};

module.exports = controller;

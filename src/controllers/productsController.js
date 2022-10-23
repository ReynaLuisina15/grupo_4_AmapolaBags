const db = require("../database/models");
const { loadProducts, storeProducts } = require("../data/produtcsModule");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const fs = require("fs");
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
          association: "colors",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
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
          include: ["images", "colors"],
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
          association: "colors",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: {
            attributes: ["quantity"],
          },
        },
      ],
    })
      .then((product) => {
        /* return res.send(product) */
        console.log(product);
        res.render("productDetail", {
          product,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },

  add: (req, res) => {
    return res.render("productAdd");
  },

  store: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { name, price, description, category, color } = req.body;
      const products = loadProducts();

      const newProduct = {
        id: products[products.length - 1].id + 1,
        name: name?.trim(),
        description: description?.trim(),
        price: +price,
        image: req.file ? req.file.filename : "default-image.png",
        color: [color],
        category,
      };

      const productsModify = [...products, newProduct];
      storeProducts(productsModify);
      return res.redirect("/products/productGeneral");
    } else {
      return res.render("productAdd", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  edit: (req, res) => {
    const categories = db.Category.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    const colors = db.Color.findAll({
      order: ["name"],
    })
    const product = db.Product.findByPk(req.params.id);
    Promise.all([categories, product, colors])
      .then(([categories, product, colors]) => {
        return res.render("productEdit", {
          product,
          categories,
          colors
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
  productDelete: (req, res) => {
    const Product = req.query;
    return res.render("productDelete", { Product });
  },
  destroy: (req, res) => {
    const { id } = req.params;

    const images = db.Image.destroy({ where: { productId: id } });

    const product = db.Product.destroy({ where: { id } });

    Promise.all([images, product])
      .then(() => {
        return res.redirect("/products/productGeneral");
      })
      .catch((err) => console.log(err));
  },
};

module.exports = controller;

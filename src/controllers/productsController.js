const db = require('../database/models')
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
      include: ["images", {
        association: "stock",
        attributes: ["quantity", "productId", "colorId"],
        include: [
          {
            association: "color",
            attributes: [
              "name"
            ]
          }
        ]
      }]
    })
      .then((products) => {
        /*return res.send(products) */
        return res.render("productGeneral", {
          products,
          toThousand,
        })
      }
      )
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
      .catch((error) => console.log(error))
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
      .catch((error) => console.log(error))
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
      .catch((error) => console.log(error))
  },

  detail: (req, res) => {
   /*  const products = loadProducts();
    const product = products.find((product) => product.id === +req.params.id);
    

    return res.render("productDetail", {
      product,
      toThousand,
    }); */
    db.Product.findByPk(req.params.id, {
       include: ["images", {
        association: "stock",
        attributes: ["quantity", "productId", "colorId"],
        include: [
          {
            association: "color",
            attributes: [
              "name"
            ]
          }
        ]
      }]
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

  edit: async (req, res) => {
    const categories = await db.Category.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    const product = await db.Product.findByPk(req.params.id);
    Promise.all([categories, product])
      .then(([categories, product]) => {
        return res.render("productEdit", {
          product,
          categories,
        });
      })
      .catch((error) => console.log(error));
  
  },

  update: (req, res) => {
 /*    const products = loadProducts();
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { name, price, category, description, color } = req.body;

      const productsModify = products.map((product) => {

        if (product.id === +req.params.id) { */

          /* if (product.id === +req.params.id) {
               if(req.files.length){
                 product.image?.forEach(img => {  
                   fs.unlinkSync("./public/img/" + img);
                 })
           } */

         /*  if (req.file) {
            fs.unlinkSync("./public/img/" + product.image);
          } */

          /* req.file && fs.unlinkSync("./public/img/" + product.image); */

         /*  return {
            ...product,
            name: name?.trim(),
            price: +price,
            description: description?.trim(),
            category,
            image: req.file?.filename || product.image,
            color: [color],
          };
        }
        return product;
      });

      storeProducts(productsModify);
      return res.redirect("/products/productDetail/" + req.params.id);
    } else {
      return res.render("productEdit", {
        product: req.body,
        id: req.params.id,
        errors: errors.mapped(),
      });
    } */
    db.Product.update(
      {
        ...req.body,
        name : req.body.name.trim(),
        description : req.body.description.trim()
      },
      {
        where : {
          id : req.params.id
        }
      }
    )
      .then( () => res.redirect("/products/productDetail/" + req.params.id))
      .catch(error => console.error(error))
  },

 /*  destroy: (req, res) => {
    const id = req.params.id;
    const products = loadProducts();
    const productsModify = products.filter((product) => product.id !== +id);
    storeProducts(productsModify);
    return res.redirect("/products/productGeneral");
  }, */

  productDelete : (req, res) => {
    const Product = req.query;
    return res.render('productDelete', {Product});
  },
  destroy : (req, res) => {
    const {id} = req.params;
    db.Product.destroy({
      where : {id}
    })

    .then((product) => {
      return res.redirect('product/General')
    })
    .catch (error => {
      console.log(error)
    })
    
  }

};

module.exports = controller;



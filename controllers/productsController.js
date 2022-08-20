const {loadProducts, storeProducts} = require("../data/produtcsModule");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const products = require('../data/productsDataBase.json')

const controller = {

      cart: (req,res) => {
              return res.render("productCart", {title:"Carrito"})
        },
    
      general: (req, res) => {
		const products = loadProducts()
		return res.render("productGeneral",{
			products,
			toThousand
		})
         
        },

	  detail: (req, res) => {		    
		const products = loadProducts()
		const product = products.find(product => product.id === +req.params.id)
		/*return res.send(product)*/

		return res.render("productDetail",{
			product,
			toThousand
		})
	      },
       	
	  add : (req,res) => {
			return res.render('productAdd',{
				brands : brands.sort()
			})
		},

	  store: (req, res) => {
		      const {name,price,description,category,color} = req.body
		      const products = loadProducts()

		      const newProduct = {
			          id : (products[products.length - 1].id + 1),
			          name : name.trim(),
			          description : description.trim(),
			          price : +price,
			          image : "default-image.png",
                     color : "default-image.png",
			          category
		      }

		      const productsModify = [...products, newProduct];
		           storeProducts(productsModify);

		           return res.redirect("productsGeneral");
	        },

	  edit: (req, res) => {
		      const products = loadProducts()
		      const product = products.find(product => product.id === +req.params.id);
		           return res.render("productEdit",{
			         product
		          })
	        },
    
	  update: (req, res) => {
		      const products = loadProducts();
		      const {name,price,category,description} = req.body
	        const productsModify = products.map(product => {
			      if (product.id === +req.params.id) {
				       return {
					             ...product,
					             name : name.trim(),
					             price : +price,
					             description : description.trim(),
					             category
				              }
			          }
			            return product
		            })
		              storeProducts(productsModify);
		              return res.redirect("productDetail" + req.params.id)
	         },

    destroy: (req, res) => {
		      const {id} = req.params;
		      const products = loadProducts();
		      const productsModify = products.filter(product => product.id !== +id);
		              storeProducts(productsModify);
		              return res.redirect("productGeneral");
	         }
};

    module.exports = controller;
    


/*  ejemplos

   const {loadProducts, storeProducts} = require("../data/productsModule")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		const products = loadProducts();
		return res.render("products",{
			products,
			toThousand
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const products = loadProducts()
		const product = products.find(product => product.id === +req.params.id)
		return res.render("detail",{
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {name,price,discount,description,category} = req.body
		const products = loadProducts()

		const newProduct = {
			id : (products[products.length - 1].id + 1),
			name : name.trim(),
			description : description.trim(),
			price : +price,
			discount : +discount,
			image : "default-image.png",
			category
		}

		const productsModify = [...products, newProduct];
		storeProducts(productsModify);

		return res.redirect("/products");
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const products = loadProducts()
		const product = products.find(product => product.id === +req.params.id);
		return res.render("product-edit-form",{
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const {name,price,discount,category,description} = req.body
	    const productsModify = products.map(product => {
			if (product.id === +req.params.id) {
				return {
					...product,
					name : name.trim(),
					price : +price,
					discount : +discount,
					description : description.trim(),
					category
				}
			}
			return product
		})
		storeProducts(productsModify);
		
		return res.redirect("/products/detail/" + req.params.id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const {id} = req.params;
		const products = loadProducts();
		const productsModify = products.filter(product => product.id !== +id);
		storeProducts(productsModify);
		return res.redirect("/products");
	}
};

module.exports = controller;
*/
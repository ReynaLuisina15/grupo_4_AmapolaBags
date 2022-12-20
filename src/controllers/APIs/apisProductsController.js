const db = require("../../database/models");
const {unlinkSync} = require("fs");
const path = require("path");
const {Op} = require("sequelize");
const {sendJsonError} = require("../../helpers/sendJsonError");
const {literalQueryUrl} = require("../../helpers/literalQueryUrl")

const controller = {
    // GET IMAGE IN VIEW
    image: (req,res) => {
      res.sendFile(
        path.join(__dirname, `../../../public/img/${req.params.img}`)
      )
    },
    // ALL PRODUCTS + QUERIES
    all: async (req,res) => {
        try {
         let {page = 1,limit = 6,offset = 0, price = 0, order = "ASC", sortBy = "name", search = "", filter} = req.query;
        
         // tipos de ordenamientos
         const typesSort =[
           "name",
           "price",
           "category",
           "newest"
         ];
         // -------------- fin tipos de ordenamiento ----

         //  Comprobaciones de key

         limit = +limit > 12 ? 12 : +limit

         sortBy = typesSort.includes(sortBy) ? sortBy : "name"

         page = +page <= 0 || isNaN(+page) ? 1 : +page
         // --------------- fin comprobaciones de key ----

         // Modificación de parámetros por query
          const queriesValuesDefaultAndModify = {
            limit,
            price,
            order,
            sortBy,
            search,
         };
         
         let urlQuery = "";

         for (const key in queriesValuesDefaultAndModify) {
                  urlQuery += `&${key}=${queriesValuesDefaultAndModify[key]}`;
            };
            
        
         // Cuentas matemáticas de objetos
         page -= 1;

         offset = page * limit

         // if ternario de ordenar por query
         const orderQuery = sortBy === "category" ? [["category", "name", order]] : sortBy === "newest" ? [["createdAt","desc"]] : [[sortBy, order]];

         // Asociaciones
         let options = {
            limit,
            offset,
            include:[{
                association:"images",
                attributes:{
                    include:[
                        literalQueryUrl({req, field:"file", alias:"urlfile", pathRoute:'/api/products/image/'})
                    ],
                    exclude:["updatedAt","createdAt","deletedAt"],
                }
            },{
                association:"category",
                attributes:{
                    exclude:["updatedAt","createdAt"]
                }
            }],
            attributes: {
                exclude:["updatedAt","deletedAt"],
                include: [ 
                    literalQueryUrl({req, field:"id", alias:"urlProduct", pathRoute:'/api/products/'}),
                    literalQueryUrl({req, field:"imgPrimary", alias:"urlImgPrimary", pathRoute:'/api/products/image/'})
                ]
            },
            order: orderQuery,
            where:{
                [Op.or]:[
                    {
                        name:{
                            [Op.substring]:search
                        }
                    },
                    {
                        description:{
                            [Op.substring]:search
                        }
                        
                    }
                ]
            }
         }
         // --------------- fin asociación ------------
         // filtrado de precio
         const optionsPrice = {
            ...options,
            where: {
                price: {
                    [Op.gte]: price
                }
            }
         }

         if (+price && !isNaN(price)){
            options = optionsPrice;
         }
         // -------------- fin filtrado de precio ----
         const {count, rows:products} = await db.Product.findAndCountAll(options);

         

         if (!products.length) {
            return res.status(200).json({
                ok:true,
                status:204,
                message: "No hay productos en esta pagina"
            })
         }


        // condiciones de pagina anterior y de pagina siguiente
         const existPrev = page > 0 && offset <= count;
         const existNext = Math.floor(count / limit) >= page + 1 && limit !== count;

         let urlPrev = null;
         let urlNext = null;

         if(existPrev){
            urlPrev = `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${page}${urlQuery}`;
         }

         if(existNext){
            urlNext = `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${page + 2}${urlQuery}`;
            }

            return res.status(200).json({
                meta:{
                    ok: true,
                    status: 200,
                },
                data:{
                    totalProducts: count,
                    prev: urlPrev,
                    next: urlNext,
                    products,
                }
            });

        } catch (error) {
            sendJsonError(error,res)
        }
    },
    // DETAIL PRODUCT
    detail: async (req,res) => {
        try {
            let options = {
                include:[{
                    association:"images",
                    attributes:{
                        include:[
                            literalQueryUrl({req, field: "file", alias: "file", pathRoute:'/api/products/image/'})
                        ],
                        exclude:["updatedAt","createdAt","deletedAt", "productId"],
                    }
                },{
                    association:"category",
                    attributes:{
                        exclude:["updatedAt","createdAt"]
                    }
                }],
                attributes: {
                    exclude:["updatedAt","deletedAt"],
                    include:[ literalQueryUrl({req, field:"imgPrimary", alias:"urlImgPrimary", pathRoute:'/api/products/image/'})]
                },              
             }
            
             const idProduct = req.params.id
             if (isNaN(idProduct)) {
                return sendJsonError("El parámetro es invalido", res, 404)
             }

            const product = await db.Product.findByPk(req.params.id, options)

            if (!product) {
                return sendJsonError("El producto solicitado no existe", res, 404)
            }
             return res.status(200).json({
                ok: true,
                status: 200,
                data: product
            })

        } catch (error) {
            sendJsonError(error, res)
        }
    },
    // CREATE PRODUCT  /* Almacenamiento de info */
   store: async (req, res) => {
    try {
      const { name, description, price, categoryId } = req.body;
      // destructuramos la info de la tabla //

      const product = await db.Product.create({
        name: name?.trim(),
        description: description?.trim(),
        price: +price,
        categoryId: +categoryId,
      }); // Lo que viene por el body lo guardamos como un objeto y creamos el Producto //

      let images = [{ productId: product.id, file: "default.png" }];
      // como son varias imagenes vienen por array y sino se sube ninguna se guarda por defecto 

      if (req.files?.length) {
        images = req.files.map((file) => {
          return {
            productId: product.id,
            file: file.filename,
          };
        });
      }
      // En un condicional si existen las imagenes va a ser mayor a cero y valida true. Luego esas imagenes se mapean
       //y retorna un objeto con esa estructura 

      await db.Images.bulkCreate({ images });

      // Imagen creada y modificaad por las imagenes subidas  

      const productReload = await product.reload({
        include: [
          {
            association: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            association: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      });
      // variable donde se almacena la recarga del estado en el que este el producto y trae las asociaciones 

      return res.status(201).json({
        ok: true,
        status: 201,
        data: productReload,
      });
      // envio las respuestas satifactorias 
    } catch (error) {
      sendJsonError(error, res);
    }
  },
  // EDIT PRODUCT
  update: async (req, res) => {
    try {
      const { name, description, price, categoryId } = req.body;
      const { id } =
        req.params; // params porque recibe en la ruta un id del producto 
      const { deletePreviousImages } = req.query;

      const product = await db.Product.findByPk(id, {
        include: [
          {
            association: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            association: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      });

      //Busco el producto por el id y lo traigo con sus asociaciones  

      product.name =
        name?.trim() || product.name; // el trim cubre los espacios en blanco 
      product.description = description?.trim() || product.description;
      product.price =
        +price ||
        product.price; // lo parseo con el + xq  nuestra base de datos debe llegar un numero no un string y cuando viaja por el body se recibe por un string  
      product.categoryId = +categoryId || product.categoryId;

      //Cubro la info si viene por body y si no existe dicha info hago corto circuito con los || 
       //y utiliza la info ya guardada en la base de datos.  
      await product.save();

      if (+deletePreviousImages === 1) {
        product.images.forEach(async (image) => {
          await image.destroy();
          unlinkSync(path.join(__dirname, `../../../public/img/${image.file}`));
        });
      }
      // Elimina las imagenes antiguas antes de guardar las nuevas, agrega la fecha en la base de datos en el deletedat y las elimina
       //tambien de la carpeta img  
      if (req.files?.length) {
        const images = req.files.map((file) => {
          return {
            file: file.filename, // filename es el nombre que me genero Multer
            productId: product.id,
          };
        });

        await db.image.bulkCreate(images);
      }

      res.status(200).json({
        ok: true,
        status: 200,
        data: await product.reload(),
      });
    } catch (error) {
      sendJsonError(error, res);
    }
  },
  // DELETE PRODUCT
  destroy: async (req, res) => {
    const { id } = req.params;

    try {
      // await db.Image.destroy({where : {productId:id}});
      //await db.Product.destroy({where : {id}}); 
      const options = {
        include: [
          {
            association: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            association: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      };

      const product = await db.Product.findByPk(id, options);

     
        product.images.forEach(async (image) => {
          await image.destroy();
          unlinkSync(path.join(__dirname, `../../../public/img/${image.file}`));
        });
        
        await product.destroy()

        res.status(200).json({
          ok: true,
          status: 200,
          msg: "Producto Eliminado",
        });
      } catch (error) {
        sendJsonError(error, res);
      }
    },
    category: async (req,res) => {
        try {
            let {filter} = req.query;

            
        
        const categorySort = await db.Category.findOne({
            where: {name: filter},
            include: [ 'products']
        })
        

        
        return res.json({
            msg: "ok",
            filter,
            quantity: categorySort.products.length,
            categorySort,
        })
        } catch (error) {
            console.log(error)
            return res.json({
                msg: "false",
                error
            })
        }
        
    },
   
};

module.exports = controller;
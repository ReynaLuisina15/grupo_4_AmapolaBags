const db = require("../../database/models");
const {unlinkSync} = require("fs");
const path = require("path");
const {Op} = require("sequelize");
const {sendJsonError} = require("../../helpers/sendJsonError");
const {literalQueryUrlImage} = require("../../helpers/literalQueryUrlImage")
const {literal} = require("sequelize")

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
                        literalQueryUrlImage(req,"file","urlfile")
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
                include: [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/',id)`),"urlProduct"]]
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
                            literalQueryUrlImage(req,"file","file")
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
    // CREATE PRODUCT
    store: (req,res) => {

    },
    // EDIT PRODUCT
    update: (req,res) => {

    },
    // DELETE PRODUCT
    destroy: (req,res) => {
        
    },
    destroy: (req,res) => {
        
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
const db = require("../../database/models");
const path = require("path");
const { sendJsonError } = require("../../helpers/sendJsonError");
const {Op} = require("sequelize");
const { literalQueryUrlImage } = require("../../helpers/literalQueryUrlImage");

const controller = {
  image: (req, res) => {
    res.sendFile(path.join(__dirname, `../../../public/img/avatar/${req.params.img}`))
  }
  ,
  list: async(req, res) =>{

    try{
      
      let { page = 1, limit = 5, offset = 0, order = 'ASC', sortBy = 'name', search = "" } = req.query;

      const typesSort = [
        'name',
        'surname',
        'newest'
      ]

      /*            COMPROBACIONES            */

      limit = +limit > 10 ? 10 : +limit;

      sortBy = typesSort.includes(sortBy) ? sortBy : 'name';

      page = +page <= 0 || isNaN(page) ? 1 : +page;

      /* ----------------------------------------------------- */
      /*               URL QUERIES               */
      const queriesValuesDefaultAndModify = {
        limit,
        order,
        sortBy,
        search
      }

      let urlQuery = '';

      const queries = queriesValuesDefaultAndModify;
      /*              FIN URL QUERIES               */
       /* ----------------------------------------------------- */
      /*              FIN COMPROBACIONES             */


      /* for in: recorre propiedades de un objeto */
      for(const key in queries){
        urlQuery += `&&${key}=${queries[key]}`
      }

      page -= 1;
      offset = page * limit;

      const orderQuery = sortBy === 'newest' ? [['createdAt', 'desc']] : [[sortBy, order]]

      const { count, rows: users } = await db.User.findAndCountAll({
          
          attributes: {
              exclude: ["updatedAt","rolId","password"],
              include: [ literalQueryUrlImage(req, 'avatar', 'avatar', '/users')]
          },
          limit,
          offset,
          order: orderQuery,
          where: {
            [Op.or]:[
              {
                name:{
                  [Op.substring]:search
                }
              },
              {
                surname: {
                  [Op.substring]:search
                }
              }
            ]
          }
      });
     /*  return res.send('USUARIOS: ' + users) */

      const existPrev = page > 0 && offset <= count;
      const existNext = Math.floor(count / limit) >= page + 1 && limit !== count;

      let urlPrev = null;
      let urlNext = null;

      if(existNext){
        urlNext = `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${page + 2}${urlQuery}`;
      }

      if(existPrev){
        urlPrev = `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${page}${urlQuery}`;
      }

      if(users.length){
            return res.status(200).json({
                meta : {
                  ok : true,
                },
                data: {
                  totalUsers: count,
                  prev: urlPrev,
                  next: urlNext,
                  users
                }
            })
        }
        throw new Error('Upss, no hay usuarios registrados 😭')
    }catch(error){
      sendJsonError(error,res);
    }
} ,
  detail: async( req, res ) => {

    try {
      const { id } = req.params;

      const users = {

        attributes: {
          exclude:["updatedAt","deletedAt", "password", "rolId"],
          include:[ literalQueryUrlImage(req, 'avatar', 'avatar', '/users')]
          }
      }

      const user = await db.User.findByPk(id, users)

      if (isNaN(id)) {
        return sendJsonError("Upss, parámetro inválido 🤡", res, 404)
      }

      if(user){

        return res.status(200).json({
          ok: true,
          status: 200,
          data: user
        })
      }
        throw new Error('Upss, el usuario no se encontró 🙁')
     
    } catch (error) {
        sendJsonError(error,res);
      }
  } 
 
}

module.exports = controller;

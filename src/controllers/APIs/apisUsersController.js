const db = require("../../database/models");
const path = require("path");
const { sendJsonError } = require("../../helpers/sendJsonError");
const { Op } = require("sequelize");
const { literalQueryUrl } = require("../../helpers/literalQueryUrl");
const {literal} = require("sequelize");
const bcryptjs = require("bcryptjs");
const { use } = require("../../routes/APIs/apiUsers");

const controller = {
  image: (req, res) => {
    res.sendFile(path.join(__dirname, `../../../public/img/avatar/${req.params.img}`))
  }
  ,
  list: async (req, res) => {

    try {

      let { page = 1, limit = 6, offset = 0, order = 'ASC', sortBy = 'name', search = "" } = req.query;

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
      for (const key in queries) {
        urlQuery += `&&${key}=${queries[key]}`
      }

      page -= 1;
      offset = page * limit;

      const orderQuery = sortBy === 'newest' ? [['createdAt', 'desc']] : [[sortBy, order]]

      const { count, rows: users } = await db.User.findAndCountAll({

        attributes: {
          exclude: ["updatedAt",  "password"],
          include: [
            literalQueryUrl({req, field: 'avatar', alias: 'avatar', pathRoute: '/api/users/image/'}), 
            literalQueryUrl({req, field:'id', alias:'detail', pathRoute:'/api/users/'})
          ],
        },
        limit,
        offset,
        order: orderQuery,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.substring]: search
              }
            },
            {
              surname: {
                [Op.substring]: search
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

      if (existNext) {
        urlNext = `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${page + 2}${urlQuery}`;
      }

      if (existPrev) {
        urlPrev = `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${page}${urlQuery}`;
      }

      if (users.length) {
        return res.status(200).json({
          meta: {
            ok: true,
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
    } catch (error) {
      sendJsonError(error, res);
    }
  },
  detail: async (req, res) => {

    try {
      const { id } = req.params;

      const users = {

        attributes: {
          exclude: ["updatedAt", "deletedAt", "password", "rolId"],
          include: [literalQueryUrl({req, field:'avatar', alias:'avatar', pathRoute:'/api/users/image/'})]
        }
      }

      const user = await db.User.findByPk(id, users)

      if (isNaN(id)) {
        return sendJsonError("Upss, parámetro inválido 🤡", res, 404)
      }

      if (user) {

        return res.status(200).json({
          ok: true,
          status: 200,
          data: user
        })
      }
      throw new Error('Upss, el usuario no se encontró 🙁')

    } catch (error) {
      sendJsonError(error, res);
    }
  },
  register: async (req, res) => {
    const { name, surname, email, password } = req.body

    try {
      if(!email || !password ){
        res.status(401).json({
          ok:false,
          status:false,
          msg: 'Ingrese email y contraseña'
        })
      }
     
         await db.User.create({
          rolId : 2,
          name: name?.trim(),
          surname:surname?.trim(),
          email:req.body.email?.trim(),
          password: bcryptjs.hashSync(password, 12),
          avatar : req.file?.filename || 'avatar.png',
        })
      

      return res.status(201).json({
        ok: true,
        status: 201,
        msg: 'Usuario creado :D'
      })
      
    } catch (error) {
     res.status(500).json({
      ok: false,
        status: 500,
        msg: 'Error en el servidor'
     })
    }
  }/* ,
  update : async (req, res) => {
    const {name, surname, email} = req.body 

    try {
      const user = await db.User.findByPk(id)
      
      user.name = name?.trim() || user.name
      user.surname = surname?.trim() || user.name
      user.avatar = req.file?.filename || user
      user.email = email?.trim() || user.name

    } catch (error) {
      
    }
  } 
 /*  login : async (req, res)=>{
    const { email, password } = req.body

    try {
      
      if(!email || !password ){
        res.status(401).json({
          ok:false,
          status:401,
          msg: 'Debes ingresar un email y contraseña valido'
        })
      }

      const user = await db.User.findOne({where:{email}})
        if (!user) {
          res.status(404).json({
            ok:false,
            status:404,
            msg: 'No existe ningun usuario con ese email'
          })
        }

        return res.status(200).json({
          ok: true,
          status: 201,
          msg: 'Usuario logueado :D'
        })

    } catch (error) {
      res.status(404).json({
        ok: false,
          status: 404,
          msg: error.msg
       })
    }
  } */
}

module.exports = controller;

const db = require('../database/models')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { sign } = require('jsonwebtoken')
const { loadUsers, storeUsers } = require('../data/db');

module.exports = {
  login: (req, res) => {
    return res.render("login", { title: "Entra al perfil" })
  },
  proccesLogin: async (req, res) => {

      let errors = validationResult(req);

    if(errors.isEmpty()){
    db.User.findOne({
      where:{
        email : req.body.email
      }
    }).then(user =>{
      const {id, name, rolId, avatar} = user
      req.session.userLogin = {
        id,
        name,
        rol : rolId,
        avatar     
      };
      if (req.body.remember){
        res.cookie('amapola', req.session.userLogin,{
          maxAge : 1000 * 60
        })
      }
    return res.redirect("/users/profile")
    }).catch(error => console.log(error))

        /* cambiar le vista register por la de profile */
   
     }else{
      return res.render("login", {
        title: "Entra al perfil",
        errors : errors.mapped()})}

  },
  register: (req, res) => {
    return res.render("register", { title: "Registro" })
  },
  processRegister: (req, res) => {
    /* let errors = validationResult(req);
    if(errors.isEmpty()){
 */

    const { name, surname, email, password } = req.body

      db.User.create({
      name: name.trim(),
      surname: surname.trim(),
      email: email.trim(),
      password: bcryptjs.hashSync(password, 12),
      rolId: 2
    }).then((user) => {
      return res.redirect('/users/login')
    }
    ).catch(error => console.log(error))


    /* let users = loadUsers();

  let newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: name ? name?.trim() : "",
    surname: surname ? surname?.trim() : "",
    email: email?.trim(),
    password: bcryptjs.hashSync(password, 12),
    rol: 'user',
    avatar : req.file ? req.file.filename : "avatar.png",
  }
  let usersModify = [...users, newUser];
  
  storeUsers(usersModify);
  return res.redirect('/users/login'); */

    /* }else{
      return res.render("register", {
        title: "Registro",
        errors : errors.mapped(),
        old: req.body})
      } */
  },
  profile: (req, res) => {
    db.User.findByPk(req.session.userLogin.id).then(
      user => {
        return res.render("profile", {
          title: "Profile",
          user
        })
      }
    ).catch(error => console.log(error))

   
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie('amapola', null, { maxAge: -1 });
    return res.redirect("/")
  }
}
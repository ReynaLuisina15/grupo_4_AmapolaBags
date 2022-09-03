const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { loadUsers, storeUsers } = require('../data/db');

module.exports = {
  login: (req, res) => {
    return res.render("login", { title: "Entra al perfil" })
  },
  proccesLogin: (req, res) => {
    let errors = validationResult(req);
    if(errors.isEmpty()){
      let {id,name,rol,avatar} = loadUsers().find(user => user.email === req.body.email);

      req.session.userLogin = {
        id,
        name,
        rol,
        avatar     
      };
      if (req.body.remember){
        res.cookie('amapola', req.session.userLogin,{
          maxAge : 1000 * 60
        })
      }
    return res.redirect("/users/profile") /* cambiar le vista register por la de profile */
    }else{
      return res.render("login", {
        title: "Entra al perfil",
        errors : errors.mapped()})
    }
  },
  register: (req, res) => {
    return res.render("register", { title: "Registro" })
  },
  processRegister: (req, res) => {
    let errors = validationResult(req);
    if(errors.isEmpty()){

      const { name, surname, email, password } = req.body;
      let users = loadUsers();

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
    return res.redirect('/users/login');
  }else{
    return res.render("register", {
      title: "Registro",
      errors : errors.mapped(),
      old: req.body})
    }
  },
  profile : (req,res) => {
    let user = loadUsers().find(user =>user.id === req.session.userLogin.id)
    
     return res.render("profile", { 
      title: "Profile",
      user
     })
  },
  logout : (req,res) => {
    req.session.destroy();
    res.cookie('amapola',null,{maxAge: -1});
    return res.redirect("/")
  }
}
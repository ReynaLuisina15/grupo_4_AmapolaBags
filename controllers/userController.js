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
    return res.redirect("/users/register") /* cambiar le vista register por la de profile */
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
      avatar: "avatar.png"
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
  processProfile : (req,res) => {
     return res.render("profile", { title: "Profile" })
  }
}
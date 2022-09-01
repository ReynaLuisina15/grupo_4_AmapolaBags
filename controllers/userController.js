const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { loadUsers, storeUsers } = require('../data/db');

module.exports = {
  login: (req, res) => {
    return res.render("login", { title: "Perfil" })
  },
  proccesLogin: (req, res) => {
    return res.render("index", { title: "index" })
  },
  register: (req, res) => {
    return res.render("register", { title: "Registro" })
  },
  processRegister: (req, res) => {

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
  },
  processProfile : (req,res) => {
     return res.render("profile", { title: "Profile" })
  }
}
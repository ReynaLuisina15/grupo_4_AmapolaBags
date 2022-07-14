const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => console.log(`Server reunning in http://localhost:${port}`));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/productCart', (req, res) => res.sendFile(path.join(__dirname, 'views', 'productCart.html')));
app.get('/productDetail', (req, res) => res.sendFile(path.join(__dirname, 'views', 'productDetail.html')));
app.get('/productGeneral', (req, res) => res.sendFile(path.join(__dirname, 'views', 'productGeneral.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));

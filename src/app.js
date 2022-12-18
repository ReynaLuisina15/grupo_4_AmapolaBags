require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
const session = require('express-session');
const localsUserCheck = require("./middlewares/localsUserCheck");
/* const userSessionCheck = require("./middlewares/userSessionCheck"); */
const cookieCheck = require('./middlewares/cookieCheck');
const cors = require('cors');


/* ROUTERS REQUIRE */

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

// ROUTERS API REQUIRE

const mainApiRouter = require("./routes/APIs/apiMain");
const categoriesApiRouter = require("./routes/APIs/apiCategories");
const productsApiRouter = require("./routes/APIs/apiProducts");
const authApiRouter = require("./routes/APIs/apiAuth");
const usersApiRouter = require("./routes/APIs/apiUsers");
const cartsApiRouter = require("./routes/APIs/apiCarts");

var app = express();

// view engine setup0 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({
  secret : "amapola",
  resave : false,
  saveUninitialized : true
}));;
app.use(cors())

/* app.use cookie */
app.use(cookieCheck);

/* app.use */
app.use(localsUserCheck);
/* app.use(userSessionCheck); */


/* ROUTERS */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

/* ROUTERS API */

app.use("/api", mainApiRouter);
app.use("/api/categories", categoriesApiRouter);
app.use("/api/products", productsApiRouter);
//app.use("/api/auth", authApiRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/cart", cartsApiRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
const dotenv = require('dotenv').config();
const sqlite = require('sqlite3').verbose();
var expressLayouts = require('express-ejs-layouts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// console.log(path.join(__dirname, 'views'))
app.set('view engine', 'ejs');


app.use(expressLayouts);
app.set('layout', './layouts/cms-layout.ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname)

// ||||| ||||| ||||| ||||| ||||| ||||| ||||| ||||| 
// ||||| ||||| ||||| ||||| ||||| ||||| ||||| ||||| 
// setup routers
const { routes } = require("./routes/index");
routes(app);	


// let db = new sqlite.Database('./prisma/dev.db')
// ||||| ||||| ||||| ||||| ||||| ||||| ||||| ||||| 
// ||||| ||||| ||||| ||||| ||||| ||||| ||||| |||||

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

const port = process.env.PORT || process.env.DEV_PORT;
app.listen(port, async function () {
	console.log('listen on port ->', port);
})

module.exports = app;

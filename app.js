var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var loginRouter = require('./src/routes/login');
var logoutRouter = require('./src/routes/logout');
var homeRouter = require('./src/routes/home');
var accountRouter = require('./src/routes/account');
var historyRouter = require('./src/routes/history');
var operationRouter = require('./src/routes/operation');
var registerRouter = require('./src/routes/register');
var bankingRouter = require('./src/routes/banking');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/home', homeRouter);
app.use('/account', accountRouter);
app.use('/history', historyRouter);
app.use('/operation', operationRouter);
app.use('/register', registerRouter);
app.use('/banking', bankingRouter);

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

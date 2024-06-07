var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var crypto = require('crypto');
var mongoose = require('mongoose');
var bcrypt = require("bcrypt");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var weatherRouter = require('./routes/weather');
var marketRouter = require('./routes/market');
var tourismRouter = require('./routes/tourism');
var charitiesRouter = require('./routes/charities');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var instructionsRouter = require('./routes/instructions');

var app = express();

const dId = "mongodb+srv://user:gULKFYWabjb9FQcI@synopticproject.qraurxz.mongodb.net/"

mongoose.connect(dId)
  .then(()=> console.log('Connected to database'))
  .catch((err) => console.log(`Error: ${err}`));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const secretSession = crypto.randomBytes(32).toString('hex');

app.use(
  session({
    secret: secretSession,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
)

app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/weather', weatherRouter);
app.use('/market', marketRouter);
app.use('/tourism', tourismRouter);
app.use('/charities', charitiesRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/instructions', instructionsRouter);

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

app.listen(3000);

module.exports = app;

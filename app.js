
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
const connection = require('./config/database')();

let loginRouter = require('./routes/loginRoute');
app.use('/', loginRouter);

let contactsRouter = require('./routes/contactsRoute');
app.use('/contacts', contactsRouter);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use((req, res, next) => {
  res.status(err.status || 500).json({
    msg: err.message,
    error: err
  });
});

module.exports = app;

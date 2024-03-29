var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var cors = require('cors');
const  {insertSampleData, deleteAllDocuments}  = require("./bin/defaultdata");

const mongoDB = "mongodb://localhost:27017/mercadonaTinder";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
insertSampleData();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imagesRouter = require('./routes/images');
var apiRouter = require('./routes/api');
var chatRouter = require('./routes/chat');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/images', imagesRouter);
app.use('/chat', chatRouter);

module.exports = app;

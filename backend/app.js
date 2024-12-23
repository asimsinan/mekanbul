var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require('./app_api/models/db');
var apiRoute=require("./app_api/routes/index");

var app = express();
var allowCrossDomain = function(req, res, next) { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(allowCrossDomain);
app.use("/api",apiRoute);

app.use('/users', usersRouter);

module.exports = app;

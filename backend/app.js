var express = require('express');
var path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require('./app_api/models/db');
var apiRoute=require("./app_api/routes/index");
const passport = require('passport');
require('./app_api/config/passport');
var app = express();
app.use(passport.initialize());
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
app.use((err, req, res, next) => {
    if (err.name == "UnauthorizedError")
      res.status(401)
      .json({ status: "No authorization token was found" });
  });
module.exports = app;

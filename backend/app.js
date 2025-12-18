require("dotenv").config();
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const passport = require("passport");
var logger = require("morgan");
require("./app_api/models/db");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./app_api/routes/index");
require("./app_api/config/passport");
var app = express();
app.use(passport.initialize());
var allowCrossDomain = function(req, res, next) { 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Headers', 'Authorization');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(allowCrossDomain);
app.use("/api", apiRouter);
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError")
    res.status(401)
    .json({ status: err });
});
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Handle 404 for routes not found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server on Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

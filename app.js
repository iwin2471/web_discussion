import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import path from "path";
import rndString from "randomstring";
import fs from "fs";
import multer from "multer";
import m from "moment-timezone";
import morgan from "morgan";

//import db
import { Users, Trainers, Notices, Matchings } from "./mongo";

//function
require("./func");

//init router and express
let app = express();
let router = express.Router();

//set view engine
app.set("views", path.join(__dirname, "views"));

//passport init
let passport = require("./passport")();

//server setting
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

//router
let index = require("./routes/index")(express.Router());

//router use
app.use("/", index);

//server start
app.listen(80);
app.on("error", onError);
app.on("listening", onListening);

//required error handle
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error) {
  if (error.syscall !== "listen") throw error;

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    case 11001:
    case 11000:
      console.log("mongo");
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  console.log(addr);

  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

module.exports = app;

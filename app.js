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
import favicon from "serve-favicon";
import device from "express-device";
import helmet from "helmet";

var session = require("express-session");
var sessionstore = require("sessionstore");

let CORS = require("cors")();
var store = sessionstore.createSessionStore();

//import db
import { Users, Boards } from "./mongo";

//function
require("./func");

//init router and express
let app = express();

//passport init
let passport = require("./passport")();

//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//server setting
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(helmet());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: store,
    secret: "what@g00dDay",
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(CORS);
app.use(device.capture());

app.disable("x-powered-by");

let server = app.listen(80);
app.on("error", onError);
app.on("listening", onListening);

var io = require("socket.io")(server);

io.on("connection", function(socket) {
  socket.on("message", function(msg) {
    io.emit("message", msg);
  });

  socket.on("test", function(msg) {
    io.emit("test", msg);
  });
});

//router
import index from "./routes/index";
import auth from "./routes/auth";
import discuss from "./routes/discuss";

//router use
app.use("/", index(express.Router()));
app.use("/auth", auth(express.Router(), passport, Users));
app.use("/discuss", discuss(express.Router(), Users, Boards));

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

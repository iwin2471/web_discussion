var multer = require("multer");

function user_duplicate(message) {
  this.message = message || "";
}
function ValidationError(message) {
  this.message = message || "";
}

function isAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

user_duplicate.prototype = new Error();
ValidationError.prototype = new Error();

global.user_duplicate = user_duplicate;
global.ValidationError = ValidationError;
global.check_param = (req_param, params) => {
  return params.every(
    str =>
      req_param[str] != undefined &&
      req_param[str] != null &&
      req_param[str].length > 0
  );
};
global.isAuth = isAuth;

var mongoose = require("mongoose");

var db = mongoose.connect(
  "mongodb://localhost/web_discussion",
  { useMongoClient: true }
);

mongoose.Promise = global.Promise;

var UserSchema = mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  profile_img: { type: String },
  email: { type: String, required: true },
  token: { type: String },
  self_introduce: { type: String }
});

var BoardSchema = mongoose.Schema({
  writer_token: { type: String, required: true },
  content: { type: String, required: true }
});

require("./err")(UserSchema, BoardSchema);
var Users = mongoose.model("users", UserSchema);
var Boards = mongoose.model("boards", BoardSchema);

exports.Users = Users;
exports.Boards = Boards;

export default db;

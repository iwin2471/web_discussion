var mongoose = require("mongoose");
var rndString = require("randomstring");
var autoIncrement = require("mongoose-auto-increment");
var db = mongoose.connect(
  "mongodb://localhost/web_discussion",
  { useMongoClient: true }
);
autoIncrement.initialize(db);
mongoose.Promise = global.Promise;

var UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  profile_img: { type: String },
  token: { type: String },
  written: [Number],
  alert: [
    {
      //type 0: comment 1: discussion
      type: { type: Boolean },
      summary: { type: String },
      sender_token: { type: String },
      agreement: {
        type: String,
        required: function() {
          return this.type == true;
        }
      }
    }
  ]
});

var BoardSchema = mongoose.Schema({
  writer_name: { type: String, required: true },
  writer_img: { type: String, required: true },
  title: { type: String, required: true },
  expire_date: { type: String, required: true },
  description: { type: String, required: true },
  sub_description: { type: String, required: true },
  person_limitation: { type: Number, required: true },
  agreement: { type: Boolean, required: true },
  discuss_token: { type: String },
  comments: [
    {
      writer_name: { type: String, required: true },
      writer_img: { type: String, required: true },
      contents: { type: String, required: true }
    }
  ],
  agree: {
    type: [discussSchema]
  },
  disagree: {
    type: [discussSchema]
  }
});

var discussSchema = mongoose.Schema({
  writer_name: { type: String, required: true },
  writer_img: { type: String, required: true },
  discuss_token: { type: String },
  contents: { type: String, required: true },
  comments: [
    {
      writer_name: { type: String, required: true },
      writer_img: { type: String, required: true },
      contents: { type: String, required: true }
    }
  ]
});

import { Pre_save_boards, Pre_save_user, Post_save_user } from "./err";
UserSchema.method("generateToken", generateToken);
BoardSchema.method("generateToken", generateToken);

UserSchema.pre("save", Pre_save_user);
UserSchema.post("save", Post_save_user);

BoardSchema.pre("save", Pre_save_boards);
BoardSchema.post("save", function(error, next) {
  Users.update(
    { name: this.writer_name, profile_img: this.writer_img },
    { $push: { written: this._id } },
    function(err, result) {
      next();
    }
  );
});

function generateToken() {
  return rndString.generate();
}

BoardSchema.plugin(autoIncrement.plugin, "boards");
var Users = mongoose.model("users", UserSchema);
var Boards = mongoose.model("boards", BoardSchema);

exports.Users = Users;
exports.Boards = Boards;

export default db;

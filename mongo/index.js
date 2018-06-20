var mongoose = require("mongoose");
var rndString = require("randomstring");

var db = mongoose.connect(
  "mongodb://localhost/web_discussion",
  { useMongoClient: true }
);

mongoose.Promise = global.Promise;

var UserSchema = mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  profile_img: { type: String },
  email: { type: String },
  token: { type: String },
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
  writer_token: { type: String, required: true },
  title: { type: String, required: true },
  expire_date: { type: String, required: true },
  description: { type: String, required: true },
  sub_description: { type: String, required: true },
  person_limitation: { type: Number, required: true }
  /*agree: {
    type: [discussSchema],
    validate: arrayLimit
  },
  disagree: {
    type: [discussSchema],
    validate: arrayLimit
  }*/
});

var discussSchema = mongoose.Schema({
  writer_token: { type: String },
  contents: { type: String },
  comments: [
    {
      writer_token: { type: String, required: true },
      contents: { type: String, required: true }
    }
  ]
});

import { Pre_save_user, Post_save_user } from "./err";
UserSchema.method("generateToken", generateToken);
UserSchema.pre("save", Pre_save_user);
UserSchema.post("save", Post_save_user);

function generateToken() {
  return rndString.generate();
}

function arrayLimit(val) {
  return val.length <= 30;
}

var Users = mongoose.model("users", UserSchema);
var Boards = mongoose.model("boards", BoardSchema);

exports.Users = Users;
exports.Boards = Boards;

export default db;

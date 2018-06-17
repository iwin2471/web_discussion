var mongoose = require("mongoose");

var db = mongoose.connect(
  "mongodb://localhost/web_discussion",
  { useMongoClient: true }
);

mongoose.Promise = global.Promise;

var UserSchema = mongoose.Schema({
  id: { type: String, unique: true, required: true },
  passwd: { type: String, required: true },
  name: { type: String, required: true },
  birth: { type: Date, required: true },
  gender: { type: Boolean, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  email: { type: String, required: true },
  phone_Number: { type: String, required: true },
  token: { type: String },
  self_introduce: { type: String },
  trainer: { type: String },
  training: [
    {
      money: { type: Number },
      time: { type: Number }
    }
  ],
  pt: [
    {
      trainer_token: { type: String },
      trainer_Date: { type: Date }
    }
  ],
  dibs: [
    {
      trainer_token: { type: String }
    }
  ]
});

var TrainerSchema = mongoose.Schema({
  id: { type: String, unique: true, required: true },
  passwd: { type: String, required: true },
  name: { type: String, required: true },
  birth: { type: Date, required: true },
  gender: { type: Boolean, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  email: { type: String, required: true },
  phone_Number: { type: String, required: true },
  token: { type: String },
  self_introduce: { type: String },
  category: { type: String },
  ptcount: { type: Number },
  visitant: { type: Number },
  spec: [
    {
      member_cnt: { type: Number },
      career_year: { type: Number },
      career_awards: { type: [String] },
      career_certificate: { type: [String] }
    }
  ],
  gym_address: { type: String, default: "null" },
  review: [
    {
      star: { type: Number },
      index: { type: String },
      comment: { type: String }
    }
  ],
  star: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  profile_img: {
    type: String,
    default: "http://ptme.co.kr/upload/profile/default"
  },
  money_per_one: { type: String }
});

var noticeSchema = mongoose.Schema({
  title: { type: String },
  date: { type: String },
  index: { type: String }
});

var servicecenterSchema = mongoose.schema({
  title: { type: String },
  date: { type: String },
  index: { type: String },
  comment: { type: String },
  token: { type: String },
  answer: {
    title: { type: String },
    content: { type: String },
    date: { type: Date },
    img: { type: String }
  },
  img: { type: String }
});

var matchingsSchema = mongoose.Schema({
  user_id: String,
  cata: String,
  location: {
    si: String,
    gu: String,
    dong: String
  },
  wont_cnt: Number,
  summary: String,
  photo: String,
  money: String
});

require("./err")(UserSchema, TrainerSchema);
var Users = mongoose.model("users", UserSchema);
var Trainers = mongoose.model("trainers", TrainerSchema);
var Notices = mongoose.model("notice", noticeSchema);
var Matchings = mongoose.model("matchings", matchingsSchema);
var Servicecenters = mongoose.model("servicecenter", servicecenterSchema);

exports.Users = Users;
exports.Trainers = Trainers;
exports.Notices = Notices;
exports.Matchings = Matchings;
exports.Servicecenters = Servicecenters;

export default db;

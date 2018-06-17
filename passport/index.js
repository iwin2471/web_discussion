var passport = require("passport");
var FacebookTokenStrategy = require("passport-facebook-token");

let ids = require("./social");

module.exports = () => {
  //passport serialize
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: ids.facebook.clientID,
        clientSecret: ids.facebook.clientSecret,
        profileFields: ["id", "displayName", "photos", "email"]
      },
      (accessToken, refreshToken, profile, done) => {
        done(null, profile);
      }
    )
  );

  return passport;
};

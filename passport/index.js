var passport = require("passport");
var LocalStrategy = require("passport-local");
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
    new LocalStrategy(function(username, password, done) {
      return done(null, user);
    })
  );

  if (ids.facebook.use) {
    passport.use(
      new FacebookTokenStrategy(
        {
          clientID: ids.facebook.clientID,
          clientSecret: ids.facebook.clientSecret,
          profileFields: ["id", "displayName", "photos", "email"]
        },
        function(accessToken, refreshToken, profile, done) {
          return done(null, profile);
        }
      )
    );
  }

  return passport;
};

let auth = (router, passport, Users) => {
  router
    .get("/", (req, res, next) => {
      return res.render("M_NewAccount");
      next();
    })
    .get(
      "/fb/token",
      passport.authenticate("facebook-token"),
      async (req, res) => {
        if (req.user) {
          var user = await Users.findOne({ id: req.user._json.id }, { _id: 0 });
          if (user) {
            await req.logout();
            req.logIn(user, function(err) {
              if (err) {
                return next(err);
              }
              return res.redirect("/discuss");
            });
          } else {
            var facebook_user = {
              id: req.user._json.id,
              name: req.user.displayName,
              profile_img: req.user.photos[0].value
            };

            facebook_user = new Users(facebook_user);
            try {
              var result = await facebook_user.save();
            } catch (e) {
              if (e instanceof ValidationError)
                return res.status(400).json({ message: e.message });
              if (e instanceof paramsError)
                return res.status(400).json({ message: e.message });
            }
            await req.logout();
            req.logIn(facebook_user, function(err) {
              if (err) {
                return next(err);
              }
              return res.redirect("/discuss");
            });
          }
        } else res.status(401).send("unauth");
        return res.redirect("/discuss");
      }
    );

  return router;
};

export default auth;

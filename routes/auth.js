let auth = (router, passport, Users) => {
  router
    .get("/", (req, res, next) => {
      res.render("M_NewAccount");
      next();
    })
    .get(
      "/fb/token",
      passport.authenticate("facebook-token"),
      async (req, res) => {
        if (req.user) {
          var user = await Users.findOne({ id: req.user._json.id }, { _id: 0 });
          if (user) res.status(200).json({ id: user.id, token: user.token });
          else {
            console.log(req.user._json);
            let facebook_user = {
              id: req.user._json.id
            };

            facebook_user = new Users(facebook_user);

            try {
              let result = await facebook_user.save();
            } catch (e) {
              if (e instanceof ValidationError)
                return res.status(400).json({ message: e.message });
            }

            if (result) return res.sendSatatus(200);
          }
        } else res.status(401).send("unauthed");
      }
    );

  return router;
};

export { auth };

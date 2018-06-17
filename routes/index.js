let index = router => {
  router
    .get("/", (req, res, next) => {
      if (!req.isAuthenticated()) res.render("M_FirstandLogin");
      else res.redirect("/main");
      next();
    })
    .get("/main", isAuth, (req, res) => {
      res.render("M_Main");
    });
  return router;
};

export { index };

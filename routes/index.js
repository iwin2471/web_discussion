let index = router => {
  router
    .get("/", (req, res, next) => {
      if (!req.isAuthenticated()) return res.render("M_FirstandLogin");
      else res.redirect("/discuss");
      next();
    })
    .get("/policy", (req, res) => {
      return res.render("summary");
    });

  return router;
};

export default index;

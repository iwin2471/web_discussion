let index = router => {
  router.get("/", (req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) return res.render("M_FirstandLogin");
    else res.redirect("/discuss");
    next();
  });

  return router;
};

export default index;

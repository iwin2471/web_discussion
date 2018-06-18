var discuss = (router, boards) => {
  router
    .get("/", isAuth, (req, res, next) => {
      res.render("M_Main", { user: req.user });
      next();
    })
    .get("detail", isAuth, async (req, res, next) => {
      res.render();
      next();
    });

  return router;
};

export default discuss;

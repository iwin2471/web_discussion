var discuss = (router, Boards) => {
  router
    .get("/", isAuth, (req, res, next) => {
      res.render("M_Main", { user: req.user });
      next();
    })
    .get("/detail/:id", isAuth, async (req, res, next) => {
      var detail = await Boards.findOne({ writer_token: res.params.id });
      res.render("M_discuss", {
        detail: detail.contents,
        agree_count: detail.agree.length,
        disagree_count: detail.disagree.length
      });
      next();
    });
  router
    .route("/create")
    .get((req, res) => {
      res.render("M_CreateTopic");
    })
    .post((req, res) => {});

  return router;
};

export default discuss;

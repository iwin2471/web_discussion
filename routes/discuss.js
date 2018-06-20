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
    })

    .get("/create", isAuth, (req, res) => {
      return res.render("M_CreateTopic", { user: req.user });
    })
    .post("/", async (req, res) => {
      var new_board = new Boards(req.body);
      try {
        var result = await new_board.save();
        return req.staus(200).send(result);
      } catch (e) {
        if (e instanceof ValidationError)
          return req.status(400).send({ message: e.message });
      }
    });

  return router;
};

export default discuss;

var discuss = (router, Users, Boards) => {
  router
    .get("/", isAuth, async (req, res, next) => {
      console.log(req.user);

      var result = await Boards.find({});
      res.render("M_Main", { user: req.user, boards: result });
      next();
    })
    .get("/detail/:id", isAuth, async (req, res, next) => {
      var id = parseInt(req.params.id);
      var detail = await Boards.findOne({ _id: id });
      res.render("M_discuss", { user: req.user, detail: detail });
      next();
    })
    .get("/create", isAuth, (req, res) => {
      return res.render("M_CreateTopic", { user: req.user });
      next();
    })
    .post("/", async (req, res) => {
      var req_board = req.body;
      req_board.writer_name = req.user.name;
      req_board.writer_img = req.user.profile_img;
      var new_board = new Boards(req_board);
      try {
        var result = await new_board.save();
      } catch (e) {
        if (e instanceof ValidationError)
          return res.status(400).send({ message: e.message });
      }

      return res.sendStatus(200);
    });

  return router;
};

export default discuss;

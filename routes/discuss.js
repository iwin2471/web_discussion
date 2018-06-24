var rndString = require("randomstring");

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
      res.render("M_discuss", {
        user: req.user,
        detail: detail,
        user: req.user
      });
      next();
    })
    .get("/report/:id", isAuth, async (req, res, next) => {
      var id = parseInt(req.params.id);
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
    })
    .post("/chan", async (req, res) => {
      var id = parseInt(req.body.id);
      var board = await Boards.findOne({ _id: id });
      var agreeleng = board.agree.length;
      var disagreeleng = board.disagree.length;

      if (board.agreement) agreeleng += 1;
      else disagreeleng += 1;
      if (agreeleng + disagreeleng < board.person_limitation) {
        try {
          await Boards.update(
            { _id: id },
            {
              $push: {
                agree: {
                  writer_name: req.user.name,
                  writer_img: req.user.profile_img,
                  contents: req.body.contents,
                  discuss_token: rndString.generate(),
                  comments: []
                }
              }
            }
          );
        } catch (e) {
          if (e instanceof ValidationError)
            return res.status(400).json({ message: e });
        }
        return res.sendStatus(200);
      } else
        return res.status(412).json({ message: "더이상 의견을 달수없습니다" });
    })
    .post("/chan/comment", async (req, res) => {
      try {
        await Boards.update(
          { "agree.discuss_token": req.body.discuss_token },
          {
            $push: {
              "agree.$.comments": {
                writer_name: req.user.name,
                writer_img: req.user.profile_img,
                contents: req.body.contents
              }
            }
          }
        );
      } catch (e) {
        if (e instanceof ValidationError)
          return res.status(400).json({ message: e });
      }
      return res.sendStatus(200);
    })
    .post("/ban", async (req, res) => {
      var id = parseInt(req.body.id);
      var board = await Boards.findOne({ _id: id });

      var agreeleng = board.agree.length;
      var disagreeleng = board.disagree.length;

      if (board.agreement) agreeleng += 1;
      else disagreeleng += 1;
      if (agreeleng + disagreeleng < board.person_limitation) {
        try {
          await Boards.update(
            { _id: id },
            {
              $push: {
                disagree: {
                  writer_name: req.user.name,
                  writer_img: req.user.profile_img,
                  contents: req.body.contents,
                  discuss_token: rndString.generate(),
                  comments: []
                }
              }
            }
          );
        } catch (e) {
          if (e instanceof ValidationError)
            return res.status(400).json({ message: e });
        }
        return res.sendStatus(200);
      } else
        return res.status(412).json({ message: "더이상 의견을 달수없습니다" });
    })
    .post("/ban/comment", async (req, res) => {
      try {
        await Boards.update(
          { "disagree.discuss_token": req.body.discuss_token },
          {
            $push: {
              "disagree.$.comments": {
                writer_name: req.user.name,
                writer_img: req.user.profile_img,
                contents: req.body.contents
              }
            }
          }
        );
      } catch (e) {
        if (e instanceof ValidationError)
          return res.status(400).json({ message: e });
      }
      return res.sendStatus(200);
    });

  return router;
};

export default discuss;

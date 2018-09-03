module.exports = function(app) {
  app.use(function(req, res, next) {
    if (req.session.userId === undefined) {
      res.render("index", {
        noUser: true
      });
    } else {
      next();
    }
  });

  app.get("/", function(req, res) {
    if (req.session.userId === undefined) {
      res.render("index", {
        noUser: true
      });
    } else {
      res.render("search", {});
    }
  });

  app.get("/collection", function(req, res) {
    res.render("collection", {});
  });

  app.get("/search", function(req, res) {
    res.render("search", {});
  });

  app.get("/result", function(req, res) {
    res.render("result", {});
  });

  app.get("/logout", function(req, res) {
    delete req.session.userId;

    res.render("index", {
      noUser: true
    });
  });
};

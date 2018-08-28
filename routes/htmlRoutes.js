module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index", {});
  });

  app.get("/search", function(req, res) {
    res.render("search", {});
  });

  app.get("/result", function(req, res) {
    res.render("result", {});
  });
};

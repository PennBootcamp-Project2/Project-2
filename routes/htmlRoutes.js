var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("../views/index", {});
  });
  app.get("/collection", function(req, res) {
    res.render("../views/collection", {});
  });

  app.get("/search", function(req, res) {
    res.render("search", {});
  });

  app.get("/result", function(req, res) {
    res.render("result", {});
  });
};

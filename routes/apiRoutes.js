var db = require("../models");
var bcrypt = require("bcrypt");

module.exports = function(app) {
  app.post("/login", function(req, res) {
    db.User.findOne({ where: { email: req.body.email } }).then(function(user) {
      if (!user) {
        return res.json({ success: false, message: "User not found!" });
      }

      bcrypt.compare(req.body.password, user.password, function(err, success) {
        if (success) {
          return res.json({ success: true, message: "User Found!" });
        } else {
          return res.json({ success: false, message: "Invalid Password!" });
        }
      });
    });
  });

  app.post("/signup", function(req, res) {
    db.User.findOne({ where: { email: req.body.email } }).then(function(user) {
      if (user) {
        return res.json({ success: false, message: "Email already used!" });
      }

      bcrypt.hash(req.body.password, 10, function(err, hash) {
        db.User.create({ email: req.body.email, password: hash }).then(
          function() {
            return res.json({ success: true, message: "User created!" });
          }
        );
      });
    });
  });

  app.get("/api/books", function(req, res) {
    db.Books.findAll({}).then(function(dbBooks) {
      res.json(dbBooks);
    });
  });

  app.delete("/api/books/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Todo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBooks) {
      res.json(dbBooks);
    });

  });
};

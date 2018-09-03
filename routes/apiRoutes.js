var db = require("../models");
var bcrypt = require("bcrypt");

module.exports = function(app) {
  app.post("/login", function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if (!user) {
        return res.json({
          success: false,
          message: "User not found!"
        });
      }

      bcrypt.compare(req.body.password, user.password, function(err, success) {
        if (success) {
          req.session.userId = user.id;

          return res.json({
            success: true,
            message: "User Found!"
          });
        } else {
          return res.json({
            success: false,
            message: "Invalid Password!"
          });
        }
      });
    });
  });

  app.post("/signup", function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if (user) {
        return res.json({
          success: false,
          message: "Email already used!"
        });
      }

      bcrypt.hash(req.body.password, 10, function(err, hash) {
        db.User.create({
          email: req.body.email,
          password: hash
        }).then(function(user) {
          req.session.userId = user.id;

          return res.json({
            success: true,
            message: "User created!"
          });
        });
      });
    });
  });

  // app.post('http://localhost:3000/result', function (req, res) {
  //     // let input = JSON.stringify(req.body.items)
  //     // input.isbn = (req.body.items[0].volumeInfo.industryIdentifiers[0].identifier);
  //     // input.title = (req.body.items[0].volumeInfo.title);
  //   console.log(req.body)

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

  // app.post('/result', function (req, res) {
  //     let input = req.body.items
  // input.isbn = (req.body.items[0].volumeInfo.industryIdentifiers[0].identifier);
  // input.title = (req.body.items[0].volumeInfo.title);

  // res.send(input)
  // res.render("result", input)
  // });

  // app.post('/result', function(req, res) {
  // //   var obj = {};
  //   // var input = req.body.items;
  //   var hbsObject = {
  //     "input": req.body.items
  //   };
  //   console.log(hbsObject)
  //   // console.log(input);
  // //   // console.log('body: ' + JSON.stringify(req.body));
  //   res.send("search");
  // });

  // };
  //   app.post('/result', function(req, res) {
  //     var obj = {};

  //     console.log('body: ' + JSON.stringify(req.body));
  //     res.send(req.body);
  //   });

  // )};
};

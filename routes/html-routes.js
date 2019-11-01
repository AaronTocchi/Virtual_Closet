// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var { User, Closets } = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the closet page
    if (req.user) {
      res.redirect("/closet");
    } else {
      res.redirect("/login");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the closet page
    if (req.user) {
      res.redirect("/closet");
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the closet page
    if (req.user) {
      res.redirect("/closet");
    } else {
      res.sendFile(path.join(__dirname, "../public/signup.html"))      
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/closet", isAuthenticated, function(req, res) {
  //   res.render('index', {stuff: [{id:'foo'},{id:'bar'},{id:'baz'}]});
  // });


  app.get("/closet", isAuthenticated, function(req, res) {
    console.log('********user',req.user);
    Closets.findAll({
        where: {
            userId: req.user.id 
        },
        include: [User]
    }).then(function (allClothes) {
        // console.log(allClothes)
        allClothes = allClothes.map(element =>  element.dataValues);
        console.log(allClothes)
        let data = {
          'right': {
            'closets': allClothes
          }
        }
        res.render("index", data);
    })
})

};

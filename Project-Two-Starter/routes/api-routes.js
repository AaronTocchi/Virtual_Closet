var {Users, Accessories, Bottoms, Shoes, Tops} = require("../models");
var axios = require("axios")
var passport = require("../config/passport");
var axios = require("axios");
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function (req, res) {
    User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });




  // closet part

  // shoes
  app.get("/api/shoes", function (req, res) {
    Shoes.findAll({}).then(function (results) {
      res.json(results)
    })
  })
  app.post("/api/shoes", function (req, res) {
    db.Shoes.create(req.body).then(function (dbShoe) {
      res.json(dbShoe);
    });

  });

  // tops
  app.get("/api/tops", function (req, res) {
    Tops.findAll({}).then(function (results) {
      res.json(results)
    })
  })

  app.post("/api/tops", function (req, res) {
    db.Tops.create(req.body).then(function (dbTop) {
      res.json(dbTop)
    });
  });

  // bottoms
  app.get("/api/bottoms", function (req, res) {
    Bottoms.findAll({}).then(function (results) {
      res.json(results)
    })
  })

  app.post("/api/bottoms", function (req, res) {
    db.Bottoms.create(req.body).then(function (dbBottom) {
      res.json(dbBottom);
    });
  });


  // accessories
  app.get("/api/accessories", function (req, res) {
    Accessories.findAll({}).then(function (results) {
      res.json(results)
    })
  })
  app.post("/api/accesories", function (req, res) {
    db.Accesories.create(req.body).then(function (dbAccesory) {
      res.json(dbAccesory)
    });
  });
  // by color
  app.get("/api/color", function (req,res){

  })

  // TODO: Front end, on page load, needs to make $.get request to this route
  app.get("/api/weather", function (req, res) {
    // On page load, axios request to weather URL

    // Geolocation
    var geoURL = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCYE9Fqg83eLXcEZJF7KmC40Sl6DIVvMKA';


    // get weather based on geolocation
    axios
      .post(geoURL)
      .then(function (res) {

        var APIkey = "278e7c59c20443319e9bda7b8a280900";
        var queryURL = `https://api.weatherbit.io/v2.0/current?lat=${res.data.location.lat}&lon=${res.data.location.lng}&units=I&key=${APIkey}`;

        return axios.get(queryURL);
      }).then(async function (res) {
        //  THEN, based on today's weather
        var temp = res.data.data[0].temp;
        var precip = res.data.data[0].precip;
        // If warm, findAll clothing that is classified as warm and send to front end
        if (temp > 60) {

          console.log("warm")
          const todaysWardrobe = getTodaysWardrob("warm")

          



          // else if cold, findAll clothing that is classidied as cold and send to front end
        } else {
          console.log("cold")

        };
        // if (precip > 0) {
        //   console.log(true)
        // } else {
        //   console.log(false)
        // };

        // 


      }).catch(err => {
        console.log(err);
      });
  })





};


async function getTodaysWardrob(temp) {
  try {
    const tableNames = [Accessories, Bottoms, Shoes, Tops];
    var clothObj = {};
    for (var i = 0; i < tableNames.length; i++) {
      var type = await tableNames[i].findAll({ where: { temp } })
      console.log(`\nTEST ${i}:\n`, test)
    }

    if (type.length) {
      clothObj = {
        Accessories,
        Bottoms,
        Shoes,
        Tops,
      }
    }
    



  } catch (err) {
    console.log(err)
  }

}

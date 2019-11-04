var { User, Closets } = require("../models");
var axios = require("axios")
var passport = require("../config/passport");
var axios = require("axios");
var Sequelize = require("Sequelize")
var Op = Sequelize.Op;

module.exports = function (app) {

    // email login
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
       console.log("hit route");
        res.json(user = req.user);
        
    });
     // "/api/signup"
    app.post("/api/signup",function (req, res) {
        console.log("Inside api/signup", req.body)
        User.create({
            name: req.body.name,
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
                name: req.user.name,
                email: req.user.email,
                id: req.user.id
            });
        }
    });


    // closet part
    


    // crete new clothes and put in the closet
    app.post("/api/closet", function (req, res) {
        console.log(req.body)
        Closets.create(req.body).then(function (newClothes) {
            res.json(newClothes);
        });
    });


    // sorting
    // /api/closet?type=shoe&color=blue
    // by color and type
    app.get("/api/closet", function (req, res) {
        console.log("req.query", req.query);
        let condition;
        // console.log('params',req.query)
        if (Object.keys(req.query).length === 0) {
            condition = {
                name: req.query.name,
                type: req.query.type,
                color: req.query.color,
                temp: req.query.temp,
                waterProof: req.query.waterProof
            }
        } else if (req.query.color && req.query.type) {
            condition = {
                where: {
                    color: req.query.color,
                    type: req.query.type
                }
            }
        } else if (req.query.type) {
            condition = {
                where: {
                    type: req.query.type
                }
            }
        } else if (req.query.color) {
            condition = {
                where: {
                    color: req.query.color,
                }
            }
        }

        Closets.findAll({
            condition,
            include: [User]
        }).then(etc => {
            res.json(etc)
        });

    })


    // by weather
    app.get("/api/closet/:weather/:waterproof", function (req, res) {
        // On page load, axios request to weather URL

        // Geolocation
        var geoURL = `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GEO_API}`;


        // get geolocation
        axios
            .post(geoURL)
            .then(function (res) {

                var queryURL = `https://api.weatherbit.io/v2.0/current?lat=${res.data.location.lat}&lon=${res.data.location.lng}&units=I&key=${process.env.DB_API}`;

                return axios.get(queryURL);
            }).then(function (response) {
                //  by weather and waterproof
                var temp = response.data.data[0].temp;
                var precip = response.data.data[0].precip;
                let condition

                if (temp > 60 && temp < 80 && precip < 40) {
                    condition = {
                        where: {
                            [Op.and]: [{ temp: 'warm' }, { waterProof: 0 }]
                        }                   // Closet.findAll({    
                    }
                } else if (temp < 60 && precip < 40) {
                    condition = {
                        where: {
                            [Op.and]: [{ temp: 'cold' }, { waterProof: 0 }]
                        }
                    }
                } else if (temp > 80 && precip < 40) {
                    condition = {
                        where: {
                            [Op.and]: [{ temp: 'hot' }, { waterProof: 0 }]
                        }
                    }
                } else if (temp > 60 && temp < 80 && precip > 40) {
                    condition = {
                        where: {
                            [Op.and]: [{ temp: 'warm' }, { waterProof: 1 }]
                        }
                    }
                } else if (temp < 60 && precip > 40) {
                    condition = {
                        where: {
                            [Op.and]: [{ temp: 'cold' }, { waterProof: 1 }]
                        }
                    }
                } else if (temp > 80 && precip > 40) {
                    condition = {
                        where: {
                            [Op.and]: [{ temp: 'hot' }, { waterProof: 1 }]
                        }
                    }
                }

                Closets.findAll({
                    condition,
                    include: [User]
                }).then(etc => {
                    res.json(etc)
                });

            }).catch(err => {
                console.log(err);
            });
    })
    
    app.get("/api/type/:type", function (req,res) {
        Closets.findAll({
            where: {
              type: req.params.type
            }, include: [User]
          }).then(function(results) {
            res.json(results);
          });
    });
   
    app.get("/api/color/:color", function (req,res) {
        console.log(req.params)
        Closets.findAll({
            where: {
              color: req.params.color
            }, include: [User]
          }).then(function(results) {
            res.json(results);
          });
    });


};
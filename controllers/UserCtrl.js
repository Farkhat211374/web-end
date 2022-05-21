const UserModel = require('../models/UserModel')
const md5 = require("md5");
const bcrypt = require("bcrypt");
const passport = require("passport");

/*
exports.register = async (req, res) => {
    bcrypt.hash(req.body.password, 18, function(err, hash) {
        const newUser = new UserModel({
            email: req.body.username,
            password:hash
        });
        newUser.save(function (err) {
            if (err) {
                res.status("404").render("404");
            } else {
                res.render("secretPage",{username:req.body.username,statusOf:"Registered"});
            }
        });
    })
};

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    UserModel.findOne({email: username}, function(err, foundUser){
        if (err) {
            res.status("404").render("404");
        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if(result===true) {
                        res.status("200").render("secretPage",{username:req.body.username,statusOf:"Logged in"});
                    }
                });
            }
        }
    })
};
 */

exports.register = async (req, res) => {
    //level 5
    UserModel.register({username: req.body.username}, req.body.password, function (err, user) {
        if (err){
            console.log(err)
            res.redirect("/register")
        }else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secret")
            });
        }
    })
};

exports.login = async (req, res) => {
    //level 5
    let user =new UserModel({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user, function (err){
        if (err){
            console.log(err)
        }else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secret")
            });
        }
    })
};

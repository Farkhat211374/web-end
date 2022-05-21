const AdminModel = require('../models/AdminModel')
const passport = require("passport");


exports.login = async (req, res) => {
    let user =new UserModel({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user, function (err){
        if (err){
            console.log(err)
        }else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("")
            });
        }
    })
};
const UserModel = require('../models/UserModel')

exports.register = async (req, res) => {
    const newUser = new UserModel({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function(err){
        if (err) {
            console.log(err);
        } else {
            res.render("secretPage",{statusOf:"Registered",username:req.body.username});
        }
    });
};

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    UserModel.findOne({email: username}, function(err, foundUser){
        if (err) {
            res.status("404").render("404");
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secretPage", {statusOf:"Logged in",username:req.body.username});
                }else{
                    res.render("404");
                }
            }
        }
    });
};
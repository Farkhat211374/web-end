const mongoose = require("mongoose");
const passportLocalMongoose=require('passport-local-mongoose')
const passport=require('passport')

let userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose)
let userModel = new mongoose.model("User", userSchema);

passport.use(userModel.createStrategy())
passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())

module.exports = userModel;
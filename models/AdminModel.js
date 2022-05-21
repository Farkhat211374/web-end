const mongoose = require("mongoose");
const passportLocalMongoose=require('passport-local-mongoose')
const passport=require('passport')


let adminSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        default: '12345'
    },
});

adminSchema.plugin(passportLocalMongoose)

let adminModel = new mongoose.model("Admin", adminSchema);

passport.use(adminModel.createStrategy())
passport.serializeUser(adminModel.serializeUser())
passport.deserializeUser(adminModel.deserializeUser())

module.exports = adminModel;
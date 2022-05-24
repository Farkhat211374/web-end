const mongoose = require("mongoose");
const passportLocalMongoose=require('passport-local-mongoose')
const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')


let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: '12345'
    },
    googleId: String
});

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

let userModel = new mongoose.model("User", userSchema);

passport.use(userModel.createStrategy())
passport.serializeUser(function (user, done) {
    done(null, user.id)
})
passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err,user)
    })
})

passport.use(new GoogleStrategy({
        clientID:"888553348835-ocu75np9rb3f39u6ru9qq0auc04lemec.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:7777/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

module.exports = userModel;
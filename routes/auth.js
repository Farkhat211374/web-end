const passport=require('passport')
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://Fara:3phnkr72@cluster0.chea4.mongodb.net/?retryWrites=true&w=majority');
let db = mongoose.connection;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID='888553348835-ocu75np9rb3f39u6ru9qq0auc04lemec.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET='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';

passport.use(new GoogleStrategy({
        clientID:     GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:7777/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        db.collection('User').insertOne({ googleId: profile.id }, function (err, user) {
            return done(null, profile);
        });
    }
));
passport.serializeUser(function (user,done){
    done(null,user);
});
passport.deserializeUser(function (user,done){
    done(null,user);
});
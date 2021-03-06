
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session')
const passport=require('passport')
const bcrypt = require('bcrypt');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

const UserRoute = require('./routes/UserRoute')
app.use('/',UserRoute)

const dbConfig = require('./config/db.config.js');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected!");
}).catch(err => {
    console.log('Could not connect!', err);
    process.exit();
});

app.get('/show',(req,res)=>{
    if(req.isAuthenticated()){
        res.render("show")
    }else{
        res.redirect("/login")
    }
});

app.get("/", (req, res)=>{
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/secret", function(req, res){
    if(req.isAuthenticated()){
        res.render("secretPage",{username:req.body.username,statusOf:"Default status"})
    }else{
        res.redirect("/login")
    }
});



app.get("/auth/google",
    passport.authenticate('google',{
        scope: ["profile"]
    })
)

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/secret');
    });

app.get('/logout', (req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/log');
});

app.use('/find',require("./routes/ProductFind"));

let port = process.env.PORT||7777;

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});

function  isLoggedIn(req,res,next){
    req.user ? next(): res.sendStatus(401);
}
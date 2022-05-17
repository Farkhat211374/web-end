const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    email: String,
    password: String
});

let userModel = new mongoose.model("User", userSchema);
module.exports = userModel;
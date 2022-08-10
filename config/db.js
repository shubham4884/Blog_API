const mongoose = require("mongoose");

exports.connectMongoose = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/blog")
  .then(() => console.log("conection is successful",))
  .catch((e) => console.log(e));
};


const userSchema =  new mongoose.Schema({
userid: Number,
title: String,
blog: String,
comment: String,
date: String,
});
exports.User = mongoose.model("User",userSchema);
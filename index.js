const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { connectMongoose, User } = require("./config/db.js");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
const Blog = require("./config/db");

connectMongoose();



app.get("/serverjs", (req, res) => {
  res.sendFile(path.join(__dirname,"public", "server.js"))
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"public", "main.html"))
});
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname,"public", "index.html"))
});

app.get("/get_blog", (req, res) => {
  User.find((err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
app.get("/get_blog_by/:id", (req, res) => {
  let abc = req.params.id;
  User.findById(abc, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});

app.post("/new_blog", (req, res) => {
  const user = new User({
    title: req.body.title,
    blog: req.body.blog,
    comment: req.body.comment,
    date: req.body.date,
  });
  user.save((err, data) => {
    if (err) throw err;
    console.log(data);
    // res.send(data);
  });
  res.sendFile(path.join(__dirname,"public", "index.html"))
});

app.delete("/delete_blog/:id", function (req, res) {
  let deleteId = req.params.id;
  console.log(typeof deleteId);
  User.findByIdAndDelete(deleteId, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
    res.end();
  });
});

app.post("/update_blog/:id", function (req, res) {
  const { title, blog, comment, date } = req.body;
  const { id } = req.params;
  User.findOneAndUpdate(
    { _id: id },
    { $set: { title, blog, comment, date } },
    { new: true },
    function (err, data) {
      if (!data) {
        res.status(404).json("No item with that id exist");
      } else {
        console.log("insert");
        res.json(data);
      }
    }
  );
});

app.listen(4500, () => {
  console.log("listening on port 4500");
});

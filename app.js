const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const studentRoutes = require("./routes/student-routes.js");
const facultyRoutes = require("./routes/faculty-routes.js");
const Port = 8080;

//version : v2

mongoose
  .connect("mongodb://127.0.0.1:27017/exampleDB")
  .then(() => {
    console.log("成功連結MongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

// middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors());

// routes
app.use("/students", studentRoutes);
app.use("/faculty", facultyRoutes);

// 處理error的 middleware
app.use((err, req, res, next) => {
  // console.log("正在使用middleware");
  return res.render("error404");
});

// Home
app.get("/", (req, res) => {
  // res.render("index");
  return res.redirect("/students");
});

app.listen(Port, () => {
  console.log(`Server正在聆聽PORT:${Port}`);
});

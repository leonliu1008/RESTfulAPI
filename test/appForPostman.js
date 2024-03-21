const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("../models/student.js");
const cors = require("cors");
const Port = 3000;

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
app.use(cors());

app.get("/students", async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    return res.send(studentData);
  } catch (e) {
    return res.status(500).send("尋找資料時,發生錯誤");
  }
});

app.get("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let foundStudent = await Student.findOne({ _id }).exec();
    return res.send(foundStudent);
  } catch (e) {
    return res.status(500).send("尋找資料時,發生錯誤");
  }
});

app.post("/students", async (req, res) => {
  try {
    let { name, age, major, merit, other } = req.body;
    // console.log(name, age, major, merit, other);
    let newStudent = new Student({
      name,
      age,
      major,
      scholarship: { merit, other },
    });
    let saveStudent = await newStudent.save();
    return res.send({
      msg: "資料儲存成功",
      savedObject: saveStudent,
    });
  } catch (e) {
    return res
      .status(400)
      .send("儲存資料時,發生錯誤。。。" + `錯誤內容:${e.message}`);
  }
});

app.put("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, age, major, merit, other } = req.body;
    let newData = await Student.findOneAndUpdate(
      { _id },
      { name, age, major, scholarship: { merit, other } },
      // 因為HTTP put request 要求客戶端提供所有數據
      // 所以我們需要根據客戶端提供的數據,更新資料庫的資料
      { new: true, runValidators: true, overwrite: true }
    );
    return res.send({ msg: "成功更新人員資料!", updateData: newData });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// 物件增加屬性範例:
// const myObject = {};
// myObject['color'] = 'blue';

// 動態添加屬性功能class
class NewData {
  constructor() {}
  serProperty(key, value) {
    if (key !== "merit" && key !== "other") {
      this[key] = value;
    } else {
      this[`scholarship.${key}`] = value;
    }
  }
}

app.patch("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    // console.log(_id);
    // console.log(req.body);
    let newObject = new NewData();
    for (let property in req.body) {
      newObject.serProperty(property, req.body[property]);
    }
    // console.log(newObject);
    let newData = await Student.findByIdAndUpdate({ _id }, newObject, {
      new: true,
      runValidators: true, // 不能寫overwrite:true
    });
    return res.send({ msg: "成功更新人員資料!", updateData: newData });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

app.delete("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deleteResult = await Student.deleteOne({ _id });
    return res.send(deleteResult);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

app.listen(Port, () => {
  console.log(`Server正在聆聽PORT:${Port}`);
});

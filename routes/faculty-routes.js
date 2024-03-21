const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("歡迎來到教職員首頁");
});

router.get("/new", (req, res) => {
  res.send("這是新增教職員資料的頁面");
});

module.exports = router;

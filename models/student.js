const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true, minlength: 2 },
  age: {
    type: Number,
    default: 12,
    max: [80, "可能有點太老了哦..."],
    min: [0, "你不是上世紀的人啦..."],
  },
  major: { type: String },
  scholarship: {
    merit: {
      type: Number,
      min: 0,
      max: [5000, "學生merit scholarship太多了"],
      default: 0,
    },
    other: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

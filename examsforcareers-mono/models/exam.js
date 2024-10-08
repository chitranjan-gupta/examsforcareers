const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  categoryMain: {
    type: String,
    required: true,
  },
  categoryBase: {
    type: String,
    required: true,
  },
});

const Exam = mongoose.model("Exam", ExamSchema);

module.exports = Exam;

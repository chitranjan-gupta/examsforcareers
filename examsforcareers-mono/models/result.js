const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  isAvail: {
    type: Boolean,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DetailSchema = new Schema({
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
  intro: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  times: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  wikipedia: {
    type: String,
    required: true,
  },
  regSdate: {
    type: String,
    required: true,
  },
  regEdate: {
    type: String,
    required: true,
  },
  lfeedate: {
    type: String,
    required: true,
  },
  admit: {
    type: String,
    required: true,
  },
  examdate: {
    type: String,
    required: true,
  },
  genobcfee: {
    type: String,
    required: true,
  },
  scstfee: {
    type: String,
    required: true,
  },
  phfee: {
    type: String,
    required: true,
  },
});

const Detail = mongoose.model("Detail", DetailSchema);

module.exports = Detail;

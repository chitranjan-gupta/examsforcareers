const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdmitSchema = new Schema({
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

const Admit = mongoose.model("Admit", AdmitSchema);

module.exports = Admit;

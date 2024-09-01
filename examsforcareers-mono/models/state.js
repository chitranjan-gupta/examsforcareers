const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const State = mongoose.model("State", StateSchema);

module.exports = State;

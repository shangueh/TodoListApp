const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  content: { type: String, require: true },
  done: false,
  trash: false,
  date: {
    type: Date,
    dafault: Date.now
  }
});

module.exports = mongoose.model("Task", TaskSchema);

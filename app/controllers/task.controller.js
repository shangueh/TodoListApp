const Task = require("../models/task.model.js");

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Task content can not be empty"
    });
  }

  // Create a Task
  const newTask = new Task({
    content: req.body.content,
    done: false,
    trash: false
  });

  // Save Task in the database
  newTask
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the task."
      });
    });
};

// Retrieve and return all tasks from the database.
exports.findAll = (req, res) => {
  Task.find()
    .sort({ date: -1 })
    .then(tasks => {
      console.log(tasks);
      res.send(tasks);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks."
      });
    });
};

// Find a single task with a taskId
exports.findOne = (req, res) => {
  console.log("RETRIEVE ONE");
  res.json(tasks);
};

// Update a task identified by the taskId in the request
exports.update = (req, res) => {
  //console.log("params: " + req.params.taskId + " body: " + req.body.isDone);
  Task.updateOne(
    { _id: req.params.taskId },
    { $set: { done: req.body.isDone } }
  )
    .then(task => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      res.send({ message: "Task updated successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      return res.status(500).send({
        message: "Could not update task with id " + req.params.taskId
      });
    });
};

// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {
  Task.deleteOne({ _id: req.params.taskId })
    .then(task => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      res.send({ message: "Task deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      return res.status(500).send({
        message: "Could not delete task with id " + req.params.taskId
      });
    });
};

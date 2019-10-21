import React, { useState, useEffect } from "react";
import axios from "axios";

import "./tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    axios
      .get("/tasks")
      .then(({ data }) => {
        setTasks(data);
      })
      .catch(error => console.log(error));
  };

  const deleteTask = taskId => {
    axios
      .delete("/tasks/" + taskId)
      .then(res => {
        if (res.status === 200) fetchAllData();
      })
      .catch(error => console.log(error));
  };

  const addTask = event => {
    event.preventDefault();
    axios
      .post("/tasks", { content: event.target.content.value })
      .then(res => {
        if (res.status === 200) fetchAllData();
      })
      .catch(error => console.log(error));
  };

  const updateTask = (taskId, isDone) => {
    console.log("taskId: " + taskId + " isDone: " + isDone);
    axios
      .put("/tasks/" + taskId, { isDone })
      .then(res => {
        if (res.status === 200) fetchAllData();
      })
      .catch(error => console.log(error));
    console.log(tasks);
  };

  return (
    <div className="container-fluid">
      <h2>Ma Liste</h2>
      <div>
        <form onSubmit={event => addTask(event)}>
          <div className="form-group">
            <div className="input-group">
              <input
                className="form-control input-lg"
                name="content"
                placeholder="Nouvelle tâche..."
                autoComplete="off"
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                >
                  <span className="fa fa-plus-circle"></span>
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
      <div>
        <ul className="list-group">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span
                className={
                  task.done ? "fa fa-check-circle-o" : "fa fa-circle-o"
                }
                onClick={() => updateTask(task._id, !task.done)}
              ></span>
              <span
                style={
                  task.done
                    ? { textDecoration: "line-through" }
                    : { textDecoration: "" }
                }
              >
                {task.content}
              </span>
              <span
                className="fa fa-trash"
                onClick={() => deleteTask(task._id)}
              ></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;

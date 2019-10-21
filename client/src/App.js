import React, { Component } from "react";
import Tasks from "./components/tasks";
import AppNavBar from "./components/AppNavBar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavBar />
        <Tasks />
      </div>
    );
  }
}

export default App;

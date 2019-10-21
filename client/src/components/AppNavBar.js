import React, { Component } from "react";

class AppNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <a className="navbar-brand" href="/">
          MERN TodoList
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={this.toggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={
            this.state.isOpen
              ? "collapse navbar-collapse show"
              : "collapse navbar-collapse"
          }
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/shangueh">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default AppNavBar;

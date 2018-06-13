import React, { Component } from "react";
import Example from "../containers/ExampleContainer";
import Admin from "./Admin";
import Email from "./Email";
import { HashRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Example} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/emailsender" component={Email} />
        </div>
      </Router>
    );
  }
}
export default App;

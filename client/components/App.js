import React, { Component } from "react";
import Example from "../containers/ExampleContainer";
//import Details from "../containers/DetailsContainer";
//import Admin from "./Admin";
//import Email from "./Email";
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
        </div>
      </Router>
    );
  }
}
export default App;

/*
      <Router>
        <div>
          <Route exact path="/" component={Example} />
          <Route exact path="/emailsender" component={Email} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/details" component={Details} />
        </div>
      </Router>
*/
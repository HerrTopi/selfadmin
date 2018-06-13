import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { config } from "../config";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      user: "",
      message: "",
      declared: false
    };
  }
  render() {
    return (
      <div className="container-fluid">
        <textarea name="" id="" cols="200" rows="20" ref={textarea => {
          this.textarea = textarea
        }}>

        </textarea>
        <button className="btn btn-primary" onClick={_ => this.send()} > SEND </button>

      </div>
    );
  }
}
export default Admin;

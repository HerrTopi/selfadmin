import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { config } from "../config";

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      user: "",
      message: "",
      declared: false
    };
  }
  send() {
    let body = this.textarea.value;
    console.log(JSON.parse(body))
    fetch("https://api.sendinblue.com/v3/smtp/email", {
      method: "post",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        'api-key': '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'
      },
      body: body
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      })
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
export default Email;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { toJS, fromJS } from "immutable";
import { config } from "../config";
var nanoajax = require('nanoajax')

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      user: {}
    };
  }
  componentDidMount() {
    this.initComponent()
  }
  initComponent() {
    const me = this;
    nanoajax.ajax({
      url: config.url + "rest/getitemsbyuserid",
      cors: true,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache'
      },
      method: 'POST',
      body: JSON.stringify({ user: this.props.vipcode })
    },
      function (code, responseText) {
        me.setState({ items: JSON.parse(responseText) })
      })
    this.getUserData()
  }
  getUserData() {
    const me = this;
    nanoajax.ajax({
      url: config.url + "rest/userbyvipcode",
      cors: true,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache'
      },
      method: 'POST',
      body: JSON.stringify({ vipcode: this.props.vipcode })
    },
      function (code, responseText) {
        const data = JSON.parse(responseText);
        console.log(data)
        me.setState({ user: data })
      })
  }
  checkIfFound(found, selfDeclared) {
    if (found) {
      if (selfDeclared) {
        return "Igen, nem szerepelt a listában"
      }
      return "Igen"
    }
    if (selfDeclared) {
      return "Nem, nem szerepelt a listában"
    }
    return "Nem"
  }
  checkIfDone(done) {
    if (done) {
      return "Igen"
    }
    return "Nem"
  }
  render() {
    return (
      <div className="container-fluid">
        <h1>VIP kód: {this.state.user.vipcode}</h1>
        <h1>Név: {this.state.user.name}</h1>
        <h1>Nyilatkozott: {this.checkIfDone(this.state.user.done)}</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Megvan?</th>
              <th>leltári szám</th>
              <th>Megnevezés</th>
              <th>Megnevezés 2</th>
              <th>Gyári szám</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((val, ind) => {
              return (<tr key={ind}>
                <td> {this.checkIfFound(val.found, val.selfDeclared)}</td>
                <td>{val.FIELD4}</td>
                <td>{val.FIELD5}</td>
                <td>{val.FIELD6}</td>
                <td>{val.FIELD7}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Details;

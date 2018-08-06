import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { toJS, fromJS } from "immutable";
import { config } from "../config";
import CustomTable from "../containers/CustomTableContainter";
import { CSVLink, CSVDownload } from "react-csv";
var nanoajax = require('nanoajax')

const docWindow = window;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      stat: {
        done: 0,
        notDone: 0
      },
      overview: [],
      notdoneppl: []
    };
  }
  componentDidMount() {
    const me = this;
    nanoajax.ajax({
      url: config.url + "rest/allusers",
      cors: true,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache'
      },
      method: 'GET'
    },
      function (code, responseText) {
        const data = JSON.parse(responseText);
        let formattedData = data.map(val => {
          let done = "Nem";
          if (val.done) {
            done = "Igen"
          }
          return {
            details: val.vipcode,
            name: val.name,
            vipcode: val.vipcode,
            done,
            email: val.email,
          }
        })
        me.setState({
          data: formattedData
        });
      })
    nanoajax.ajax({
      url: config.url + "rest/donestat",
      cors: true,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache'
      },
      method: 'GET'
    },
      function (code, responseText) {
        const data = JSON.parse(responseText);
        me.setState({
          stat: data
        });
      });
    //notdoneppl
    //notdoneppl
    nanoajax.ajax({
      url: config.url + "rest/notdoneppl",
      cors: true,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache'
      },
      method: 'GET'
    },
      function (code, notdoneppl) {
        const data = JSON.parse(notdoneppl);
        me.setState({ notdoneppl })
      })
    //get detailed excel
    nanoajax.ajax({
      url: config.url + "rest/detailedoverview",
      cors: true,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache'
      },
      method: 'GET'
    },
      function (code, detailedoverview) {
        const data = JSON.parse(detailedoverview);
        me.setState({ overview: data })
      })
  }
  navToDetails(vipcode) {
    this.props.history.push("/details")
  }
  getStateData() {
    return {}
  }
  copyText() {
    debugger;
    docWindow.copy(this.state.notdoneppl)
  }
  render() {
    return (
      <div className="container-fluid">
        <h1>Nyilatkozott: {this.state.stat.done}{", "}Nem nyilatkozott: {this.state.stat.notDone}</h1>
        <hr />
        {this.state.data && (<CustomTable
          type=""
          keys={fromJS(["details", "name", "vipcode", "email", "done"])}
          content={fromJS(this.state.data)}
          header={fromJS({
            "details": "_",
            "name": "Név",
            "vipcode": "VIP kód",
            "email": "E-mail cím",
            "done": "Nyilatkozott"
          })}
          selectable={false}
          visibility={false}
          navToDetails={_ => { return this.navToDetails() }}
        />)}
        {this.state.overview && <CSVLink
          className="btn btn-primary"
          data={this.state.overview}
          separator={";"}
          target="_self">
          Részletes kimutatás
          </CSVLink>}
        {this.state.notdoneppl &&
          <CSVLink
            className="btn btn-primary"
            data={this.state.notdoneppl}
            separator={";"}
            target="_self">
            Nem nyilatkoztak
        </CSVLink>}
      </div>
    );
  }
}
export default Admin;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { config } from "../config";
var nanoajax = require('nanoajax')

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      user: "",
      message: "",
      declared: false
    };
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
      body: JSON.stringify({ user: this.state.user.vipcode })
    },
      function (code, responseText) {
        me.setState({ items: JSON.parse(responseText) })
      })
  }



  newItem() {
    const me = this;
    const newItem = {
      FIELD1: this.state.user.vipcode,
      FIELD4: me.leltariszam.value,
      FIELD5: me.megnevezes.value,
      FIELD6: me.megnevezes2.value,
      FIELD7: me.gyariszam.value
    }
    nanoajax.ajax({
      url: config.url + "rest/savenewitem",
      cors: true,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache'
      },
      method: 'POST',
      body: JSON.stringify(newItem)
    },
      function (code, responseText) {
        me.initComponent()
        me.leltariszam.value = ""
        me.megnevezes.value = ""
        me.megnevezes2.value = ""
        me.gyariszam.value = ""
      })

    console.log(newItem)
  }


  deleteItem(id) {
    const me = this;

    nanoajax.ajax({
      url: config.url + "rest/deleteitem",
      cors: true,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache'
      },
      method: 'POST',
      body: JSON.stringify({ id })
    },
      function (code, responseText) {
        me.initComponent()
      })
  }

  login() {
    const me = this;

    nanoajax.ajax({
      url: config.url + "rest/login",
      cors: true,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache'
      },
      method: 'POST',
      body: JSON.stringify({ vipcode: me.vip.value, password: me.password.value })
    },
      function (code, responseText) {
        const data = JSON.parse(responseText);
        if (data) {
          me.setState({ user: data, declared: false })
          me.initComponent()
        } else {
          me.setState({ declared: true })
        }
      })
  }
  finalize() {
    if (!this.confirm.checked) {
      this.setState({ message: "Fogadja el a nyilatkozatot!" })
    } else {
      const me = this;
      const confirmedItems = {};
      this.state.items.forEach((val, ind) => {
        confirmedItems[val.id] = this[val.id].checked
      })
      console.log(this.passwordagain.value);

      const declareData = {
        confirmedItems,
        user: this.state.user.vipcode,
        password: this.passwordagain.value
      }

      nanoajax.ajax({
        url: config.url + "rest/declare",
        cors: true,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          'Cache-Control': 'no-cache'
        },
        method: 'POST',
        body: JSON.stringify(declareData)
      },
        function (code, responseText) {
          me.setState({ declared: true });
        })
    }
  }

  render() {
    return (
      <div className="container-fluid">
        {this.state.declared && (<h1>Nyilatkozat már leadva.</h1>)}
        {(!this.state.declared && this.state.user) && (<div>
          <h1>VIP kód: {this.state.user.vipcode}</h1>
          <h1>Név: {this.state.user.name}</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Megvan?</th>
                <th>leltári szám</th>
                <th>Megnevezés</th>
                <th>Megnevezés 2</th>
                <th>Gyári szám</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map((val, ind) => {
                return (<tr key={ind}>
                  <td> <input type="checkbox" className="form-control" ref={chckbx => {
                    this[val.id] = chckbx
                  }} /> </td>
                  <td>{val.FIELD4}</td>
                  <td>{val.FIELD5}</td>
                  <td>{val.FIELD6}</td>
                  <td>{val.FIELD7}</td>
                  <td>{val.selfDeclared && (
                    <button className="btn btn-danger" onClick={_ => this.deleteItem(val.id)}>Törlés</button>
                  )}</td>
                </tr>)
              })}
              <tr>
                <td><button className="btn btn-success form-control" onClick={_ => this.newItem()}>Új tétel mentése</button></td>
                <td><input type="text" ref={leltariszam => {
                  this.leltariszam = leltariszam;
                }} /></td>
                <td><input type="text" ref={megnevezes => {
                  this.megnevezes = megnevezes;
                }} /></td>
                <td><input type="text" ref={megnevezes2 => {
                  this.megnevezes2 = megnevezes2;
                }} /></td>
                <td><input type="text" ref={gyariszam => {
                  this.gyariszam = gyariszam;
                }} /></td>
              </tr>
            </tbody>
          </table>
          <input type="checkbox" ref={confirm => {
            this.confirm = confirm;
          }} />   Nyilatkozom, hogy ...
        <br />
          Jelszó megerősítése: <input type="text" ref={input => {
            this.passwordagain = input;
          }} />
          <button className="btn btn-primary" onClick={_ => {
            this.finalize()
          }} >Nyilatkozat leadása</button>
        </div>)}
        {(!this.state.user && !this.state.declared) && (<div>
          <div className="row">
            <div className="col-xs-4 col-xs-offset-4 text-center">
              <h1>VIP kód</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4 col-xs-offset-4">
              <input
                className="form-control"
                ref={input => {
                  this.vip = input;
                }}
                type="text"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-4 col-xs-offset-4 text-center">
              <br /><br />
              <h1>Jelszó</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-4 col-xs-offset-4">
              <input
                className="form-control"
                ref={input => {
                  this.password = input;
                }}
                type="password"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4 col-xs-offset-4">
              <br />
              <button
                className="btn btn-primary form-control"
                onClick={_ => this.login()}>
                Bejelentkezés
            </button>
            </div>
          </div>
        </div>)}
        {this.state.message && (<div className="alert alert-danger">
          {this.state.message}
        </div>)}

      </div>
    );
  }
}
export default Example;

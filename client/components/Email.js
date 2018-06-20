import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { config } from "../config";

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  send(body) {
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
  getUsers() {
    const me = this;
    fetch(config.url + 'rest/allusers', {
      method: "get",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (users) {
        me.setState({ users }, _ => {
          me.emailSender();
        });
      })
  }
  emailSender() {
    console.log(this.from.value, this.to.value)
    this.state.users.slice(this.from.value, this.to.value).forEach(val => {
      const body = {
        "sender": { "name": "Bors István", "email": "istvan.bors@marketingdata.hu" },
        "sender.email": "istvan.bors@marketingdata.hu",
        "to": [{ "name": val.name, "email": val.email }],
        "replyTo.email": "istvan.bors@marketingdata.hu",
        "subject": "Önbevalló felület adatok",
        "htmlContent":
          `<h3>Kedves ${val.name}!</h3> 
        <br>
      A  Raiffeisen Bank Zrt. 2018-as tárgyi eszköz leltára során a személyi használatú eszközök felvétele önbevallás alapján történik. 
      Az önbevallás határideje: 2018.06.29. <br>
      Az alábbi linkre kattintva bejelentkezés után (VIP ID, és a levélben lévő jelszó), a neveden lévő eszközöket látod. <br><br>
      <h4> <a href="http://toppanto.herokuapp.com">Önbevalló felület</a></h4>
      <br>
      Kérlek ha ezeket az eszközöket te használod a sor elején lévő négyzetbe jelöld, amennyiben van más eszköz ami nincs felsorolva kérlek új sorként vedd fel. 
      Kötelező adatok amiket meg kell adnod új eszköz felvétele esetén: 
      <ul>
      <li>Leltári szám</li>
      <li>Megnevezés</li>
      <li>Gyári szám</li>
      </ul>
      <br>
   
      Ha olyan tételt látsz, ami a listádban szerepel, de nem te használod akkor az eszköz előtti mezőt hagyd üresen. 
      A nyilatkozat elfogadása és a jelszó ismételt megadása után tudod leadni a bevallásod.
      <br>
      <br>
      <h4>Jelszó:${val.password}</h4>`
      }
      //this.send(JSON.stringify(body))
    })
  }
  render() {
    return (
      <div className="container-fluid">
        From: <input type="text" ref={from => {
          this.from = from;
        }} /> <br /><br />
        To: <input type="text" ref={to => {
          this.to = to;
        }} />
        <br /><br />
        <br /><br />
        <br /><br />
        <br /><br />

        <button className="btn btn-primary" onClick={_ => this.getUsers()} > SEND </button>
      </div>
    );
  }
}
export default Email;

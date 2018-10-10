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
    fetch(config.url + 'rest/userlistbycode', {
      method: "post",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "codes": ["5477",
          "4842",
          "9573",
          "1847",
          "7623",
          "10943",
          "8638",
          "5352",
          "4244",
          "11351",
          "9656",
          "10524",
          "3558",
          "8550",
          "8405",
          "83",
          "5857",
          "3507",
          "3855",
          "332",
          "1916",
          "6100",
          "7187",
          "11199",
          "10717",
          "10622",
          "9822",
          "8980",
          "334",
          "11535",
          "10221",
          "6221",
          "205",
          "8889",
          "1722",
          "8513",
          "1310",
          "8496",
          "887",
          "10353",
          "1902",
          "777",
          "9641",
          "89",
          "722",
          "11374",
          "7328",
          "6652",
          "9077",
          "1688",
          "1243",
          "4718",
          "4033",
          "9009",
          "11811",
          "9542",
          "1067",
          "1053",
          "10677",
          "11730",
          "8620",
          "8607",
          "10758",
          "10239",
          "1032",
          "9006",
          "4213",
          "351",
          "817",
          "574",
          "11731",
          "10368",
          "1169",
          "3560",
          "8177",
          "431",
          "9758",
          "10585",
          "268",
          "248",
          "9789",
          "8463",
          "10238",
          "11786",
          "8175",
          "4134",
          "8398",
          "7831",
          "8399",
          "11079",
          "11265",
          "11397",
          "1919",
          "11053",
          "3399",
          "8090",
          "11760",
          "10724",
          "6457",
          "1205",
          "1538",
          "10894",
          "11461",
          "9499",
          "8263",
          "3918",
          "4568",
          "7849",
          "5404",
          "10449",
          "10859",
          "11105",
          "10523",
          "10447",
          "11542",
          "11490",
          "5384",
          "5082",
          "612",
          "6054",
          "6168",
          "5967",
          "1533",
          "6612",
          "3674",
          "7309",
          "4445",
          "592",
          "1065",
          "805"]
      })
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
      Az önbevallás határideje: 2018.10.15. <br>
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
      this.send(JSON.stringify(body))
    })
  }

  sendCustom() {
    const body = {
      "sender": { "name": "Bors István", "email": "istvan.bors@marketingdata.hu" },
      "sender.email": "istvan.bors@marketingdata.hu",
      "to": [{ "name": "Czibere Veronika", "email": "vczibere@raiffeisen.hu" }],
      "replyTo.email": "istvan.bors@marketingdata.hu",
      "subject": "Önbevalló felület adatok",
      "htmlContent":
        `<h3>Kedves Czibere Veronika! </h3>
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
    <h4>Jelszó:asdasdasdasdasd</h4>`
    }
    this.send(JSON.stringify(body))
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
/**
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
 */
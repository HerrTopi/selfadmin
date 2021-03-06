var express = require("express");
var router = express.Router();
var mongodb = require("mongodb");
var mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection(
  "mongodb://HerrTopi:selfadmin316227766@ds161939.mlab.com:61939/selfadmin"
);
Schema = mongoose.Schema;
autoIncrement.initialize(connection);

var selfadminSchema = new Schema({
  FIELD1: String,  //"Dolg.kód",
  FIELD2: String,  //"Dolg.név",
  FIELD3: String,  //"email cím",
  FIELD4: String,  //"leltári szám",
  FIELD5: String,  //"Megnevezés",
  FIELD6: String,  //"Megnevezés 2",
  FIELD7: String,   //"Gyári szám"
  found: Boolean,
  selfDeclared: Boolean
});

var userSchema = new Schema({
  vipcode: String,
  name: String,
  password: String,
  email: String,
  done: Boolean
});

//autoIncrement setup
selfadminSchema.plugin(autoIncrement.plugin, { model: "selfadmin", field: "id" });
const selfadmin = connection.model("selfadmin", selfadminSchema);


//autoIncrement setup
userSchema.plugin(autoIncrement.plugin, { model: "user", field: "id" });
const user = connection.model("selfuseradmin", userSchema);

//example post request with find query
router.post("/getitemsbyuserid", function (req, res, next) {
  const data = req.body;
  selfadmin.find({ FIELD1: data.user }, function (err, response) {
    res.json(response);
  });
});

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//example post request with find query
router.post("/initusers", function (req, res, next) {
  const data = req.body;
  let counter = 0;
  data.forEach(element => {
    counter++;
    element.password = makeid();
    element.done = false;
    let newUser = new user(element);
    newUser.save((err, docs) => { console.log(counter) });
  });
});

//example post request with find query
router.post("/inititems", function (req, res, next) {
  const data = req.body;
  let counter = 0;
  data.forEach(element => {
    counter++;
    let newItem = new selfadmin(element);
    newItem.save((err, docs) => { console.log(counter) });
  });
});
//example post request with find query
router.post("/savenewitem", function (req, res, next) {
  const data = req.body;
  newItemData = data;
  newItemData.selfDeclared = true;

  let newItem = new selfadmin(data);
  newItem.save((err, docs) => { res.json(true); });
});
//example post request with find query
router.post("/deleteitem", function (req, res, next) {
  const data = req.body;

  selfadmin.remove({ id: data.id }, (err, docs) => { res.json(true); });
});
//example post request with find query
router.get("/deleteall", function (req, res, next) {
  selfadmin.remove({}, (err, docs) => { res.json(true); });
});
//example post request with find query
router.get("/deletealluser", function (req, res, next) {
  user.remove({}, (err, docs) => { res.json(true); });
});
//example post request with find query
router.post("/login", function (req, res, next) {
  const data = req.body;

  user.find({ vipcode: data.vipcode, password: data.password }, function (err, response) {
    if (response.length === 1) {
      if (response && response[0] && response[0].done) {
        res.json("declared");
      } else {
        res.json({
          vipcode: response[0].vipcode,
          name: response[0].name
        });
      }
    } else {
      res.json(false);
    }

  });
});

//example post request with find query
router.get("/allitems", function (req, res, next) {
  selfadmin.find({}, function (err, response) {
    res.json(response);
  });
});
//example post request with find query
router.get("/allusers", function (req, res, next) {
  console.log("gettin'");
  user.find({}, function (err, response) {
    res.json(response);
  });
});

router.post("/declare", function (req, res, next) {
  const data = req.body;
  user.find({ vipcode: data.user, password: data.password }, function (err, response) {
    if (response.length === 1) {
      for (let key in data.confirmedItems) {
        selfadmin.findOneAndUpdate(
          { id: key },
          { found: data.confirmedItems[key] },
          { upsert: true },
          function (err, doc) { console.log(key, data.confirmedItems[key]) }
        );
      }
      user.findOneAndUpdate(
        { vipcode: data.user },
        { done: true },
        { upsert: true },
        function (err, doc) {
          res.json(true);
        }
      );
    } else {
      res.json(false);
    }

  });
});

router.post("/test/:id", function (req, res, next) {
  const id = req.params.id;
  res.json(id);
});


//get declared, undeclared data
router.get("/donestat", function (req, res, next) {
  user.count({ done: true }, function (err, done) {
    user.count({ done: false }, function (err, notDone) {
      res.json({
        done,
        notDone
      })
    })
  })
});

//get declared, undeclared data
router.get("/notdoneppl", function (req, res, next) {
  user.find({ done: false }, { email: 1, _id: 0 }, function (err, notDone) {

    res.json(notDone.map(notD => notD.email).join(', '))
  })
});
//get declared, undeclared data
router.post("/userlistbycode", function (req, res, next) {
  const { codes } = req.body;
  let counter = codes.length;
  console.log(`code number: ${counter}`)
  let result = []
  codes.forEach((code) => {
    user.find({ vipcode: code }, function (err, found) {
      counter--;
      if (found.length) {
        result = [...result, found[0]]
      }
      if (counter <= 0) {
        console.log(`results number: ${result.length}`)
        res.json(result)
      }
    })
  })
});


//get declared, undeclared data
router.get("/detailedoverview", function (req, res, next) {
  user.find({ done: true }, function (err, done) {
    const result = [["Vip kód", "Leltári szám", "Megnevezés", "Nála van"]];
    let counter = 0;
    const doneLength = done.length;
    for (let i = 0; i < doneLength; i++) {
      selfadmin.find({ FIELD1: done[i].vipcode }, function (err, response) {
        let responseLength = response.length;
        for (let i = 0; i < responseLength; i++) {
          if (response[i] && response[i].FIELD1) {
            let found = "nem";
            if (response[i].found) {
              found = "igen";
            }
            result.push([response[i].FIELD1, response[i].FIELD4, response[i].FIELD5, found]);
          }
        }
        counter++;
        if (counter >= doneLength) {
          res.json(result)
        }
      });
    }
  })

});


//get declared, undeclared data
router.post("/userbyvipcode", function (req, res, next) {
  const data = req.body;
  user.find({ vipcode: data.vipcode }, function (err, response) {
    if (response.length === 1) {
      res.json({
        vipcode: response[0].vipcode,
        name: response[0].name,
        done: response[0].done
      });
    } else {
      res.json(false);
    }

  });
});



module.exports = router;

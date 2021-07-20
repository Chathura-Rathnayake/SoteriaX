const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

// const functions = require("firebase-functions");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); //the firestore database

// testing the database connection
//testing writes
var citiesRef = db.collection("cities");
citiesRef.doc("SF").set({
  name: "San Francisco",
  state: "CA",
  country: "USA",
  capital: false,
  population: 860010,
  regions: ["west_coast", "norcal"],
});

//testing reads
var docRef = db.collection("cities").doc("SF");
docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("hello it works.!");
});

//testing firebase functions
// exports.getUser = functions.https.onRequest((req, res) => {
//   admin.
//   firestore()
//   .collection("cities")
//     .get()
//     .then((data) => {
//       let cities = [];
//       data.forEach((doc) => {
//         cities.push(doc.data());
//       });
//       return res.json(cities);
//     })
//     .catch((err) => console.error(err));
// });

app.use(express.static(path.join(__dirname, "build")));

//a test route
app.get("/", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ a: 1 }, null, 3));
});

app.listen(process.env.PORT || 8080);
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

//body parser middleware setup

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json"); //this file is excluded from repo

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); //loading the firestore database

//a test route

app.get("/", function (req, res) {
  res.send("hello it works.!");
});

//a test route (to send data to frontend)
app.get("/retrieve", function (req, res) {
  //doing a read
  var docRef = db.collection("test").doc("chathu");
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        //sending the response to the frontend
        res.json({
          name: doc.data().name,
          age: doc.data().age,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
});

//a test route (to retrieve data from frontend)
app.post("/send", function (req, res) {
  console.log(req.body);
  admin
    .auth()
    .verifyIdToken(req.body.token) //verify the token came from frontend
    .then((decodedToken) => {
      //only an API request from a verified user will reach inside this block
      console.log("I'm inside, I'm a verified user");
      console.log(decodedToken.uid); //logging that user's uid

      //sending an authenticated response (which means only authenticated users will receive this reponse)
      res.json({

        name: "huuu",
        age: "aaaaa",

      });
    })
    .catch((error) => {
      // Handle error
    });

  //testing writes
  // var citiesRef = db.collection("test");
  // citiesRef.doc("fromFront").set({
  //   name: req.body.username,
  //   token: req.body.token,
  // });
});

app.post("/headguardSupport", function (req, res) {
  // console.log(req.body); 
  var data = require("./headlifeguard/headguardSupport.js");
  data.sendData(req, db, admin)
});

app.post("/trainingView", async function (req, res) {
  var toSend = [];
  admin
  .auth()
  .verifyIdToken(req.body.token)
  .then(() => {
  db.collection("lifeguards").get() 
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        toSend.push(doc.data());
      });
      console.log(toSend)
      res.json(toSend); //sending the response
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    })
  }).catch((error) => {
    console.log ("token errror :", error)
  });

  


});

app.get("/adminSuggestion", function (req, res) {
  //doing a read
  var docRef = db.collection("Help Requests");
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        //sending the response to the frontend
        res.json({
          accountType: doc.data().accountType,
          companyId: doc.data().companyId,
          headline: doc.data().headline,
          msg: doc.data().msg,
          status: doc.data().status,
          viewed: doc.data().viewed,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  //   const citiesRef = db.collection('cities');
  //     const snapshot = await citiesRef.get();
  //     snapshot.forEach(doc => {
  //     console.log(doc.id, '=>', doc.data());
  //     });
});

/*
An example for retrieving multiple documents from the database and sending to the frontend
*/

//a test route (to send data to frontend) - without authentication
app.get("/multipledocs", function (req, res) {
  //doing a read from firebase
  let toSend = [];
  db.collection("Complaints")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        toSend.push(doc.data());
      });
      res.json(toSend); //sending the response
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
});

app.listen(process.env.PORT || 8080);

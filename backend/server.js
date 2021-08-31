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
  var lifeguards = [];
 
  console.log(req.body)
  console.log("came here 3");
  const data = db.collection('lifeguards');
  const snapshot = await data.where('accountStatus', '==', true).get();
  admin
  .auth()
  .verifyIdToken(req.body.token)
  .then(() => {
  if (snapshot.empty) {
      console.log('No matching documents.');
      return;
  }
  // console.log(snapshot)
  snapshot.forEach(doc => {
      console.log(doc)
      const fname= (doc.data().firstName);
      const lname= (doc.data().lastName);
      const uid = doc.data().empID;
      // lifeguards.push([uid,fname,lname]);
      lifeguards.push({
        uid:uid,
        fname:fname,
        lname:lname});
  });

  res.json({
  lifeguards
  });
  
  console.log(lifeguards)
});
  // admin
  // .auth()
  // .verifyIdToken(req.body.token)
  // .then(() => {
  //     console.log("came here 3");
  //     const data = db.collection('lifeguards');
  //     const snapshot = await data.where('accountStatus', '==', true).get();
  //     if (snapshot.empty) {
  //         console.log('No matching documents.');
  //         return;
  //     }
  //     snapshot.forEach(doc => {
  //         console.log("came here 4");
  //         console.log(doc.data().firstName, "", doc.data().lastName);
  //     });
  // })
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

app.listen(process.env.PORT || 8080);

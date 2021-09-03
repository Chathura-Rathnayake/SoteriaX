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

});



// ------------- HeadlifeGuard backend functions  ----------------

app.post("/headguardSupport", function (req, res) {  //headlifeguard support backend code 
  var data = require("./headlifeguard/headguardSupport.js");
  data.sendData(req,db,admin,res);
});

app.post("/trainingView", async function (req, res) {  //headlifeguard training backend code 
  var data = require("./headlifeguard/trainingView.js");
  data.getData(req,db,admin,res);
});

app.post("/supportData", async function (req, res) {  //headlifeguard support data backend code 
  var data = require("./headlifeguard/supportData.js");
  data.getData(req,db,admin,res);
});

app.post("/CreateTrainingSession", async function (req, res) {  //headlifeguard support data backend code 
  var data = require("./headlifeguard/trainingDataSubmit.js");
  data.sendData(req,db,admin,res);
});
// ------------- HeadlifeGuard backend functions  ----------------





app.get("/adminSuggestion", function (req, res) {
  //doing a read from firebase
  let toSend = [];

  db.collection("suggestions")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // db.collection("headLifeguards")
        //   .get()
        //   .then((querySnapshot2) => {
        //     querySnapshot2.forEach((doc2) => {
              
        //      if(doc.data().userID == doc2.data().id)
        //     {
        //       console.log(doc.data().userID);
        //       console.log(doc2.data().firstName);
        //     }
        //   });
        // })
        var temp = [];
        temp = doc.data();
        temp.name = "Shanuka";
        console.log(temp);
        toSend.push(temp);
       // console.log(doc.data().userID); 
      });
      res.json(toSend); //sending the response
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
});

app.get("/getLifeguards", function (req, res) {
  //doing a read from firebase
  let toSend = [];
  db.collection("lifeguards")
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

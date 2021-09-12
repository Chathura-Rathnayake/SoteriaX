const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

require("dotenv").config({ path: __dirname + "/.env" });
process.env["BASE_URL"] = "http://localhost:3000";
//console.log(process.env.BASE_URL);

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

app.post("/headguardSupport", function (req, res) {
  //headlifeguard support backend code
  var data = require("./headlifeguard/headguardSupport.js");
  data.sendData(req, db, admin, res);
});

app.post("/trainingView", async function (req, res) {
  //headlifeguard training backend code
  var data = require("./headlifeguard/trainingView.js");
  data.getData(req, db, admin, res);
});

app.post("/supportData", async function (req, res) {
  //headlifeguard support data backend code
  var data = require("./headlifeguard/supportData.js");
  data.getData(req, db, admin, res);
});
app.post("/supportDataComplaints", async function (req, res) {
  //headlifeguard support data backend code
  var data = require("./headlifeguard/supportDataComplaints.js");
  data.getData(req, db, admin, res);
});
app.post("/supportDataSuggestions", async function (req, res) {
  //headlifeguard support data backend code
  var data = require("./headlifeguard/supportDataSuggestions.js");
  data.getData(req, db, admin, res);
});
app.post("/addLifeguard", function (req, res) {  //headlifeguard support backend code 
  var data = require("./headlifeguard/addLifeguard.js");
  data.sendData(req,db,admin,res);
  console.log(req.body);
});

app.post("/deleteLifeguard", function (req, res) {  //headlifeguard support backend code 
  var data = require("./headlifeguard/deleteLifeguard.js");
  data.sendData(req,db,admin,res);
  console.log(req.body);
});

// ------------- HeadlifeGuard backend functions  ----------------
app.post("/CreateTrainingSession", async function (req, res) {  //headlifeguard support data backend code 
  console.log(req)
  var data = require("./headlifeguard/trainingDataSubmit.js");
  data.sendData(req,db,admin,res);
});

app.post("/getTrainingRecords", async function (req, res) {  //get training records data backend code 
  var data = require("./headlifeguard/getTrainingRecords.js");
  data.getData(req,db,admin,res);
});

app.post("/DeleteScheduledTraining", function (req, res) {  //headlifeguard support backend code
  console.log(req.body) 
  var data = require("./headlifeguard/deleteScheduledTraining.js");
  data.deleteData(req,db,admin,res);
});
app.post("/getOperationCount", async function (req, res) {  //get training records data backend code 
  var data = require("./headlifeguard/getOperationCount.js");
  data.getData(req,db,admin,res);
});
app.post("/getTrainingCount", async function (req, res) {  //get training records data backend code 
  var data = require("./headlifeguard/getTrainingRecords.js");
  data.getData(req,db,admin,res);
  
});
app.post("/getLifeguardCount", async function (req, res) {  //get training records data backend code 
  var data = require("./headlifeguard/getLifeguardCount.js");
  data.getData(req,db,admin,res);
  
});
app.post("/getCompanyName", async function (req, res) {  //get training records data backend code 
  var data = require("./headlifeguard/getCompanyName.js");
  data.getData(req,db,admin,res);
  
});
app.post("/getlatestDataOperation", async function (req, res) {  //get training records data backend code 
  var data = require("./headlifeguard/getlatestDataOperation.js");
  data.getData(req,db,admin,res);
  
});

// ------------- HeadlifeGuard backend functions  ----------------



//-----------------------Suggestions-----------------------//

app.get("/adminSuggestion", async function (req, res) {  
  var data = require("./Admin/adminSuggestions.js");
  data.getData(req,db,admin,res);
});



app.post("/viewSuggestions", async function (req, res) {  
  var data = require("./Admin/viewSuggestion.js");
  data.sendData(req,db,admin,res);
});


app.post("/updateSuggestions", async function (req, res) {  
  var data = require("./Admin/updateSuggestions.js");
  data.sendData(req,db,admin,res);
});

//-----------------------------------Complaints--------------------------------//

app.get("/adminComplaint", async function (req, res) {  
  var data = require("./Admin/adminComplaints.js");
  data.getData(req,db,admin,res);
});

app.post("/viewComplaints", async function (req, res) {  
  var data = require("./Admin/viewComplaints.js");
  data.sendData(req,db,admin,res);
});

app.post("/updateComplaints", async function (req, res) {  
  var data = require("./Admin/updateComplaints.js");
  data.sendData(req,db,admin,res);
});

//-----------------------------------HelpRequest--------------------------------//

app.get("/adminHR", async function (req, res) {  
  var data = require("./Admin/adminHR.js");
  data.getData(req,db,admin,res);
});

app.post("/viewHR", async function (req, res) {  
  var data = require("./Admin/viewHR.js");
  data.sendData(req,db,admin,res);
});

app.post("/updateHR", async function (req, res) {  
  var data = require("./Admin/updateHR.js");
  data.sendData(req,db,admin,res);
});

//-----------------------------------Admin HeadLG--------------------------------//
app.get("/adminHLG", async function (req, res) {  
  var data = require("./Admin/adminHLG.js");
  data.getData(req,db,admin,res);
});

app.post("/updateHLG", async function (req, res) {  
  var data = require("./Admin/updateHLG.js");
  data.sendData(req,db,admin,res);
});

//********** Heta thamai danna wenne*************************************//

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

//get all lifeguards to display in
// app.get("/getLifeguards", function (req, res) {
//   //doing a read from firebase
//   let toSend = [];
//   db.collection("lifeguards")
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         toSend.push(doc.data());
//       });
//       res.json(toSend); //sending the response
//     })
//     .catch((error) => {
//       console.log("Error getting documents: ", error);
//     });
//   });

  app.post("/getLifeguards", async function (req, res) {  //get training records data backend code 
    var data = require("./headlifeguard/getLifeguards.js");
    data.getData(req,db,admin,res);
    console.log(data);
  });


/** routes related to the user authentication module **/
//The route to create an instance in the resetTickets collection and send a password reset email to the user
app.post("/createResetToken", function (req, res) {
  var data = require("./Admin/createResetToken.js");
  data.sendData(req, db, admin, res);
});

app.post("/isResetTokenValid", function (req, res) {
  var data = require("./Admin/resetTokenValidity.js");
  data.sendData(req, db, admin, res);
});

app.post("/changePwd", function (req, res) {
  var data = require("./Admin/changePwd.js");
  data.sendData(req, db, admin, res);
});

app.listen(process.env.PORT || 8080);

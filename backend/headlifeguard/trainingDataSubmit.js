module.exports = {
    sendData: function (req, db, admin,res) {
     console.log(req.body)
      admin
        .auth()
        .verifyIdToken(req.body.token)
        .then((decodedToken) => {
            
          db.collection("trainingOperations")
            .add({
              title:req.body.title,
              companyID: decodedToken.uid,
              completed: false,
              operationStatus: "Pending",
              currentStage:0,
              currentStatus:"Not Initialized",
              date:req.body.date,
              startTime:req.body.time,
              engaged:false,
              engagedLifeguard: {
                userID: '',
                userType: '',
              },
              operationStatus: "Pending",
              participants: {
                dronePilot: req.body.Pilot,
                dronePilotName:req.body.PilotName,
                mobileHandeler: req.body.Package,
                mobileHandelerName: req.body.PackageName,
                swimmer: req.body.Rescuer,
                swimmerName:req.body.RescuerName,

              },
              lastestTimePing: {
                stopWatch:0,
                timePing: new Date(0)
              },
             
              timeline: ["","","","","",],
              // trainingTimes: ["1.23","1.50","2.45","5.43","6.24",],
              trainingTimes: ["","","","","",],
              summary:req.body.Summary,
              seaCondition:req.body.SeaCondition,
            })
            .then(function (docRef) {
              console.log("Training Document written with ID: ", docRef.id);
              res.json(docRef.id)
            }).catch(function (error) {
              console.error("Error adding document: ", error);
            });
  
  
        })
  
  
  
    }
  
  }
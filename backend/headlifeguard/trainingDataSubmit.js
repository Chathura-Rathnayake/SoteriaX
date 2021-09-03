module.exports = {
    sendData: function (req, db, admin,res) {
     console.log(req.body)
      admin
        .auth()
        .verifyIdToken(req.body.token)
        .then((decodedToken) => {
            
          db.collection("trainingV2")
            .add({
              userID: decodedToken.uid,
              companyID: decodedToken.uid,
              title:req.body.title,
              date:req.body.date,
              time:req.body.time,
              summary:req.body.Summary,
              seaCondition:req.body.SeaCondition,
              package:req.body.Package,
              rescuer:req.body.Rescuer,
              pilot:req.body.Pilot,
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
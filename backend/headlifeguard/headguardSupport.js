
module.exports = {
  sendData: function (req, db, admin,res) {
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {

        if (req.body.type == 1) {
          collectionName = "helpRequests"
        } else if (req.body.type == 2) {
          collectionName = "complaints"
        } else {
          collectionName = "suggestions"
        }
        var today = new Date(),
          date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        db.collection(collectionName)
          .add({
            accountType: "headLifeGuard",
            userID: decodedToken.uid,
            companyID: decodedToken.uid,
            headline: req.body.headline,
            msg: req.body.msg,
            status: 0,
            viewed: 0,
            date: date
          })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            res.json(docRef.id)
          }).catch(function (error) {
            console.error("Error adding document: ", error);
          });


      })



  }

}

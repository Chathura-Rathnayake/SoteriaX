
module.exports = {
  sendData: function (req, db, admin) {
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {

        if (req.body.type == 1) {
          collectionName = "Help Requests"
        } else if (req.body.type == 2) {
          collectionName = "Complaints"
        } else {
          collectionName = "Suggestions"
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
          }).catch(function (error) {
            console.error("Error adding document: ", error);
          });


      })



  }

}

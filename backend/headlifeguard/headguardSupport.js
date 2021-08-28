
module.exports = {
  sendData: function (req, db) {

    if (req.body.type = 1) {
      collectionName = "Help Requests"
    } else if (req.body.type = 2) {
      collectionName = "Complaints"
    } else {
      collectionName = "Suggestions"
    }
    db.collection(collectionName)
      .add({
        accountType: "headLifeGuard",
        companyId: "xxxxxxxxxx",
        headline: req.body.headline,
        msg: req.body.msg,
        status: "pending",
        viewed: "false"
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      }).catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }

}

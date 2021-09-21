module.exports = {
  sendData: function (req, db, admin, res) {
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        if (req.body.type == 1) {
          collectionName = "helpRequests";
        } else if (req.body.type == 2) {
          collectionName = "complaints";
        } else {
          collectionName = "suggestions";
        }
        var today = new Date(),
        month = '' + (today.getMonth() + 1),
        day = '' + today.getDate(),
        year = today.getFullYear();

        if (month.length < 2)
        { 
          month = '0' + month;
          console.log(month);
        }
        if (day.length < 2)
        { 
          day = '0' + day;
        } 
        date = year+"-"+month+"-"+day;
        console.log(date);

        db.collection(collectionName)
          .add({
            accountType: "headLifeGuard",
            userID: decodedToken.uid,
            companyID: decodedToken.uid,
            headline: req.body.headline,
            msg: req.body.msg,
            status: 0,
            viewed: 0,
            date: date,
          })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            res.json(docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      });
  },
};

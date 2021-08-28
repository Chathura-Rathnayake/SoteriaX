app.get("/retrieve", function (req, res) {
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

//       accountType
// "headLifeGuard"
// companyId
// "xxxxxxxxxx"
// headline
// "help 1234"
// msg
// "12345 "
// status
// "pending"
// viewed
// "false"

    //   const citiesRef = db.collection('cities');
    //     const snapshot = await citiesRef.get();
    //     snapshot.forEach(doc => {
    //     console.log(doc.id, '=>', doc.data());
    //     });

  });

module.exports = {
    sendData: function (req, db, admin,res) {
      admin
        .auth()
        .verifyIdToken(req.body.token)
        .then((decodedToken) => {
            //console.log(req.body);
          // db.collection("lifeguards")
          //   .add({
          //     //id: docRef.id,
          //     firstName: req.body.firstName,
          //     lastName: req.body.lastName,
          //     companyID: decodedToken.uid,
          //   //   headline: req.body.headline,
          //     age: req.body.age,
          //     NIC: req.body.NIC,
          //     phone_number: req.body.phone_no,
          //     email: req.body.email,
          //   })
          //   .then(function (docRef) {
          //     console.log("Document written with ID: ", docRef.id);
          //     res.json(docRef.id)
          //   }).catch(function (error) {
          //     console.error("Error adding document: ", error);
          //   });
          db.collection("lifeguards").doc(req.body.id).delete().then(
                //console.log("Document written with ID: ", docRef.id);
                // res.json(docRef.id)
                console.log("Deletion completed")
              ).catch(function (error) {
                console.error("Error adding document: ", error);
              });
  
  
        })
  
  
  
    }
  
  }
  
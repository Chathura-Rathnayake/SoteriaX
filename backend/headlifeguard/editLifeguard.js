
module.exports = {
    sendData: function (req, db, admin,res) {
      admin
        .auth()
        .verifyIdToken(req.body.token)
        .then((decodedToken) => {

          db.collection("lifeguards").doc(req.body.id).set(
              {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                NIC: req.body.NIC,
                phone_number: req.body.phone_no,
                email: req.body.email,
                birthDate: req.body.birthDate,
                certificateLevel: req.body.certificateLevel,
                isPilot: Boolean(req.body.isPilot),
                gender: req.body.gender,
                id: req.body.id,
                companyID: req.body.companyID,
              }
          ).then(
                //console.log("Document written with ID: ", docRef.id);
                // res.json(docRef.id)
                console.log("Edit completed")
              ).catch(function (error) {
                console.error("Error editing document: ", error);
              });
  
  
        })
  
        admin
        .auth()
        .updateUser(req.body.id, {
          email: req.body.email,
        })
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully updated user', userRecord.toJSON());
        })
        .catch((error) => {
          console.log('Error updating user:', error);
        });
      
    console.log(req.body);
  
    }

  
  }
  
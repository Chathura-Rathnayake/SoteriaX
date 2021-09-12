
module.exports = {
    sendData: function (req, db, admin,res) {
      admin
        .auth()
        .verifyIdToken(req.body.token)
        .then((decodedToken) => {

          db.collection("lifeguards").doc(req.body.id).delete().then(
                //console.log("Document written with ID: ", docRef.id);
                // res.json(docRef.id)
                console.log("Deletion completed")
              ).catch(function (error) {
                console.error("Error adding document: ", error);
              });
  
  
        })
  
        admin
        .auth()
        .deleteUser(req.body.id)
        .then(() => {
        console.log('Successfully deleted user');
      })
      .catch((error) => {
      console.log('Error deleting user:', error);
    });
  
    }

  
  }
  
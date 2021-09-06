module.exports = {
    sendData: async (req, db, admin, res) => {
        admin
            .auth()
            .verifyIdToken(req.body.token)
            .then((decodedToken) => {
                db.collection("complaints").doc(req.body.complaintID)
                .update({
                  reply: req.body.reply,
                  status: 1,
                })
                .then(function (docRef) {
                  console.log("Document written with ID: ", docRef.id);
                  res.json(docRef.id)
                }).catch(function (error) {
                  console.error("Error adding document: ", error);
                });              
            }).catch((error) => {
                console.log("token errror :", error)
            });
    }
  
  }
  
  
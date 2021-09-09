module.exports = {
  deleteData: function (req, db, admin, res) {
    
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        db.collection("trainingOperations")
          .doc(req.body.id)
          .delete()
          .then(function (docRef) {
            console.log("Document written with ID: ");
            res.json([{ status: true }]);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      });
  },
};

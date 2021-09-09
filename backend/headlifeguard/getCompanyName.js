module.exports = {
  getData: async (req, db, admin, res) => {
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        db.collection("headLifeguards")
          .doc(decodedToken.uid)
          .get()
          .then((doc) => {
            res.json(doc.data()); //sending the response
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      })
      .catch((error) => {
        console.log("token errror :", error);
      });
  },
};

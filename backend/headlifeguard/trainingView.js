module.exports = {
  getData: async (req, db, admin, res) => {
    var toSend = [];
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        db.collection("lifeguards")
          .where("companyID", "==", decodedToken.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              toSend.push(doc.data());
            });
            res.json(toSend); //sending the response
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

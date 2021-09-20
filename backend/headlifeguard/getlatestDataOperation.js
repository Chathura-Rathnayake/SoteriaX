module.exports = {
  getData: async (req, db, admin, res) => {
    var toSend = [];
    var temp = [];
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then((decodedToken) => {
        db.collection("operations")
          .orderBy("startDate", "desc")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data().companyId) 
              console.log(decodedToken.uid) 
              if (doc.data().companyId == decodedToken.uid) {
                temp = doc.data();
                temp.id = doc.id;
                toSend.push(temp);
              }
            });
            
            const firstElement = toSend.shift();
            res.json(firstElement); //sending the response
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

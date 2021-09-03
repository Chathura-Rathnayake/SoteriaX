module.exports = {
  sendData: async (req, db, admin, res) => {
    //console.log(req.body.uid);
    console.log(req.body.uid);
    console.log(req.body.token);

    //get the tokenHash for this UID from the database
    var collectionRef = db.collection("resetTokens");
    var query = collectionRef.where("uid", "==", req.body.uid);
    query
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //compare two hashes
          const bcrypt = require("bcrypt");
          bcrypt.compare(
            req.body.token, //the token received from the frontend (from URL of the user)
            doc.data().tokenHash, //the hash stored in the database
            function (err, resp) {
              let status = 1; //status code --> everything is okay - 0 , invalid token - 1, token expiration - 2
              if (resp) {
                console.log("Your password mached with database hash password");
                //check the expiration date
                if (new Date(req.body.expirationTime) > new Date()) {
                  //token has not expired
                  console.log("token has not expired - we good to go");
                  //check whether the token is used before
                  if (req.body.tokenUsed) {
                    //token is used before
                    console.log("token is used");
                    res.json({
                      status: 2,
                    });
                  } else {
                    console.log("token isn't used - we good man");
                    //mark the token as used (updating the database)
                    doc.collectionRef.update({ tokenUsed: true });
                    //return the feedback to front end
                    res.json({
                      status: 0,
                    });
                  }
                } else {
                  //token has expired
                  console.log("token has expired");
                  res.json({
                    status: 2,
                  });
                }
              } else {
                //Hashes did not mached
                console.log("Hashes did not mached.");
                res.json({
                  status: 1,
                });
              }
            }
          );
        });
      })
      .catch((error) => {
        console.log("Error getting the token from DB: ", error);
      });
  },
};

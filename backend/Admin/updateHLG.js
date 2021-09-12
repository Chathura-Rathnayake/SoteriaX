module.exports = {
    sendData: async (req, db, admin, res) => {
        admin
            .auth()
            .verifyIdToken(req.body.token)
            .then((decodedToken) => {
                db.collection("headLifeguards").doc(req.body.hlgID)
                .update({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userEmail: req.body.userEmail,
                    birthday: req.body.birthday,
                    userPhone: req.body.userPhone,
                    gender: req.body.gender,
                    companyName: req.body.companyName,
                    companyAddress: req.body.companyAddress,
                    companyEmail: req.body.companyEmail,
                    companyPhone: req.body.companyPhone,
                    piModel: req.body.piModel,
                    staticIP: req.body.staticIP,
                    supportType: req.body.supportType,
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
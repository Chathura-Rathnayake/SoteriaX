module.exports = {
    getData: async (req, db, admin, res) => {
        var toSend = [];
        var temp =[];
        admin
            .auth()
            .verifyIdToken(req.body.token)
            .then((decodedToken) => {
                db.collection("trainingV2").where("companyID", "==" ,decodedToken.uid).get()
                    .then((querySnapshot) => {
                     
                        querySnapshot.forEach((doc) => {
                            temp =doc.data()
                            temp.id = doc.id
                            toSend.push(temp);
                        });
                        
                        res.json(toSend)//sending the response
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    })
            }).catch((error) => {
                console.log("token errror :", error)
            });

    }

}


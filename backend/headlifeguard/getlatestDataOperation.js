module.exports = {
    getData: async (req, db, admin, res) => {
        var toSend = [];
        var temp =[];
        admin
            .auth()
            .verifyIdToken(req.body.token)
            .then((decodedToken) => {
                db.collection("operations").orderBy("startDate", 'desc').limit(1).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if(doc.data().companyId == "VtTjOxCyvrM64l6qX64WzIp3IPJ3"  ){
                                temp =doc.data()
                                temp.id = doc.id
                                toSend.push(temp);
                            }

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


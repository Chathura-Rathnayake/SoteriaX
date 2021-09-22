
module.exports = {
  getData: function (req, db, admin,res) {

        let toSend = [];
        db.collection("suggestions").orderBy('date','desc')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var temp = [];
              var docname = doc.id;
              var uid = doc.data().userID;
              
              if(doc.data().accountType == "headLifeGuard" && !doc.data().name){
              db.collection("headLifeguards").doc(uid)
                .get()
                .then((doc2) => {
                  var username = doc2.data().firstName + " " + doc2.data().lastName;
                  console.log(username)
                  var setdata = db.collection("suggestions").doc(docname);
                  setdata.update({
                    name: username,
                  });
                })
              }  
      
              temp = doc.data();
              temp.suggestionID = docname;
              toSend.push(temp);
            });
            res.json(toSend); //sending the response
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

  }

}


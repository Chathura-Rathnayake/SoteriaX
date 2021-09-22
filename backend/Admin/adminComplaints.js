
module.exports = {
    getData: function (req, db, admin,res) {
  
        let toSend = [];
        db.collection("complaints").orderBy('date','desc')
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
                  var comName = doc2.data().companyName;
                  console.log(username, comName)
                  var setdata = db.collection("complaints").doc(docname);
                  setdata.update({
                    name: username,
                    companyName: comName,
                  });
                })
              }  
              
      
              temp = doc.data();
              temp.complaintID = docname;
              toSend.push(temp);
              console.log(temp)
            });
            res.json(toSend); //sending the response
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
  
    }
  
  }
  
  

module.exports = {
    getData: function (req, db, admin,res) {
  
          let toSend = [];
          db.collection("headLifeguards")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                var temp = [];
                var docname = doc.id;
                var name = doc.data().firstName + " " + doc.data().lastName;
                var today = new Date();
                var birthDate = new Date( doc.data().birthday);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
                {
                    age--;
                }
                temp = doc.data();
                temp.name = name;
                temp.hlgID = docname;
                temp.age = age;
                toSend.push(temp);
              });
              res.json(toSend); //sending the response
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
  
    }
  
  }
  
  
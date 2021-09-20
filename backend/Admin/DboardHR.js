module.exports = {
    getData: function (req, db, admin,res) {
          let hrCount;
          db.collection("helpRequests").where("viewed", "==", 0)
            .get()
            .then(snap => {
                if(snap.size){
                    size = snap.size // will return the collection size
                    hrCount = size;
                }
                else
                {
                    hrCount = 0;
                }
                console.log(hrCount)
                res.json(hrCount);
              });
             
  
    }
  
  }
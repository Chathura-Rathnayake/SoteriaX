module.exports = {
    getData: function (req, db, admin,res) {
          let sugCount;
          db.collection("suggestions").where("viewed", "==", 0)
            .get()
            .then(snap => {
                if(snap.size){
                    size = snap.size // will return the collection size
                    sugCount = size;
                }
                else
                {
                    sugCount = 0;
                }
                console.log(sugCount)
                res.json(sugCount);
              });
             
  
    }
  
  }
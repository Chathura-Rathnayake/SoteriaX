module.exports = {
    getData: function (req, db, admin,res) {
          let comCount;
          db.collection("complaints").where("viewed", "==", 0)
            .get()
            .then(snap => {
                if(snap.size){
                    size = snap.size // will return the collection size
                    comCount = size;
                }
                else
                {
                    comCount = 0;
                }
                console.log(comCount)
                res.json(comCount); 
              });
             
  
    }
  
  }
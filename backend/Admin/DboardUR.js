module.exports = {
    getData: function (req, db, admin,res) {
          let count;
          db.collection("userRequests")
            .get()
            .then(snap => {
                if(snap.size){
                    size = snap.size // will return the collection size
                    count = size;
                }
                else
                {
                    count = 0;
                }
                console.log(count)
                res.json(count);
              });
             
  
    }
  
  }
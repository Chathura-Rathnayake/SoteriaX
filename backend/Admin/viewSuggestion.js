
module.exports = {
    sendData: function (req, db, admin,res) {
  
          db.collection(suggestions).doc(req.body.suggestionID)
            // .add({
            //   reply: req.body.reply
            // })
            .then(function (docRef) {
              console.log("Document written with ID: ", docRef.id);
              res.json(docRef.id)
            }).catch(function (error) {
              console.error("Error adding document: ", error);
            });
    }
  }
  
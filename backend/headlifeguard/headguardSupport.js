



module.exports ={
    sendData: function(req,db)
{
    //console.log("testing");
    db.collection("Help Requests")
    .add({
      accountType: "headLifeGuard",
      companyId: "xxxxxxxxxx",
      headline: req.body.headline,
      msg: req.body.msg,
      status: "pending",
      viewed: "false"
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
    return(msg)
}

}

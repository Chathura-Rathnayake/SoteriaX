module.exports = {
  sendData: async (req, db, admin, res) => {
    //console.log(req.body.uid);
    console.log(req.query.uid);
    console.log(req.query.token);
    res.send("ahahah");
  },
};

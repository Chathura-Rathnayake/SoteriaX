module.exports = {
  sendData: async (req, db, admin, res) => {
    // console.log(req.body.uid);
    // console.log(req.body.pwd);

    //changing the password
    admin
      .auth()
      .updateUser(req.body.uid, {
        password: req.body.pwd,
      })
      .then((userRecord) => {
        res.json({
          status: 0, //status code: everything is okay - 0 , error - 1
        });
      })
      .catch((error) => {
        console.log("Error updating user:", error);
        res.json({
          status: 1, //status code: everything is okay - 0 , error - 1
        });
      });
  },
};

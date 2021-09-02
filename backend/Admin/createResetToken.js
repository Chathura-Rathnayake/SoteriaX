module.exports = {
  sendData: async (req, db, admin, res) => {
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then(() => {
        console.log("A verified request");
        //console.log(req.body.headlifeguardUID);

        //getting the current time + 30 minutes (to set the token expiration time in database)
        var time = new Date(); //getting the current time
        time.setMinutes(time.getMinutes() + 30); //adding 30 minutes to it
        //console.log(time);

        //creating a random string as the reset token
        function makeResetToken(length) {
          var result = "";
          var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }
          return result;
        }
        let resetToken = makeResetToken(16);
        //console.log(resetToken);
        //getting the hash value of the token and sending all 04 data (uid,timestamp,tokenHash,tokenUsed) to the firebase collection
        const bcrypt = require("bcrypt");
        bcrypt.hash(resetToken, 10, function (err, hash) {
          //Add a new document to the resetTokens collection
          db.collection("resetTokens")
            .add({
              expirationTime: time,
              tokenHash: hash,
              tokenUsed: false,
              uid: req.body.headlifeguardUID,
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });

        //send the email to the user
        var nodemailer = require("nodemailer");

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "binarag65@gmail.com",
            pass: "",
          },
        });

        var mailOptions = {
          from: "binarag65@gmail.com",
          to: "c.rathnayake97@gmail.com",
          subject: "Sending Email using Node.js",
          text: "That was easy!",
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

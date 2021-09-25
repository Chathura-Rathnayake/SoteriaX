module.exports = {
  sendData: async (req, db, admin, res) => {
    admin
      .auth()
      .verifyIdToken(req.body.token)
      .then(() => {
        //sending the email via nodemailer
        var nodemailer = require("nodemailer");
        var transporter = nodemailer.createTransport({
          service: "yahoo",
          auth: {
            user: "soteriax@yahoo.com",
            pass: "asghmjtnjqvpbwkj",
          },
        });

        var mailOptions = {
          from: "soteriax@yahoo.com",
          to: req.body.email,
          subject: "SoteriaX Mobile Application APK",

          html: `<p>Hello,</p>

              <p>
              We have sent you this email in response to your request to create a lifeguard account on SoteriaX. </br>
              Please follow this link to download the APK file, https://firebasestorage.googleapis.com/v0/b/soteriax-las.appspot.com/o/vids%2Fhu1.webm?alt=media&token=74fb4fee-f75d-4377-aee4-1dc50f989c7e
              </p>

              <p>Team SoteriaX</p>`,
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

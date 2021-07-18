import React from "react";
import Typography from "@material-ui/core/Typography";
import "../assets/css/footer.css";

import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Grid from "@material-ui/core/Grid";

export default function Footer() {
  return (
    <div className="footerSpace">
      {" "}
      <center>
        <div className="parent">
          <div className="child">
            {" "}
            <FacebookIcon />
          </div>
          <div className="child">
            <InstagramIcon />
          </div>
          <div className="child">
            <LinkedInIcon />
          </div>
        </div>
        <div className="parent">
          <div className="child">
            <Typography variant="subtitle1" color="initial">
            © 2021 SoteriaX. All Rights Reserved.
            </Typography>
          </div>
        </div>
      </center>
    </div>
  );
}

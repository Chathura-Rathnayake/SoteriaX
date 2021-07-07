import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import backgroundTop from "../assets/images/img22.jpg";
import "../assets/css/homeTopImage.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    Typography: {
      fontSize: 36,
    },
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#e65100",
    },
  },
});

export default function HomeTopImage() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="container">
          <img src={backgroundTop} alt="" />
          <div className="centered">
            <Typography variant="h3">UAV Assistance for Lifeguards</Typography>
            <Typography variant="h5">
              SoteriaX - The goddess of salvation
            </Typography>
            <div>
              <Button variant="outlined" color="secondary">
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

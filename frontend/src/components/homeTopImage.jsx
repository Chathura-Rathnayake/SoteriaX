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
            <Typography
              variant="h2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              UAV Assistance for Water Rescue Operations
            </Typography>
            <Typography
              variant="h4"
              // style={{ fontFamily: "'Orbitron', sans-serif" }}
              // textShadow:"0px 0px 2px rgba(0,0,0,0.25)
            >
              SoteriaX - The Goddess of Salvation
            </Typography>
            <div>
              <Button
                variant="outlined"
                color="secondary"
                style={{
                  textTransform: "none",
                }}
                href="/headlifeguardRequest"
              >
                Get Registered
              </Button>

              <Button
                variant="contained"
                color="secondary"
                style={{
                  textTransform: "none",
                  marginLeft: 10,
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

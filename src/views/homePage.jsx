import React from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import backgroundTop from "../assets/images/img2.jpg";
import "../assets/css/home.css";

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

export default function HomePage() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className="container">
          <img src={backgroundTop} alt="" />
          <div className="centered" xs="12" sm="3">
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

        <Link to="/aboutPage">Go to Aboutpage</Link>
      </ThemeProvider>
    </div>
  );
}

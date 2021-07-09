import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import logo from "../assets/icons/logoWhiteWithoutName.png";
import "../assets/css/navbar.css";

const useStyles = makeStyles(() => ({
  palette: {
    secondary: {
      main: "#ff6d33",
    },
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontFamily: ['"Orbitron"', 'sans-serif'].join(','),
    fontSize:25,
    // font:,
    // fontFamily:'Orbitron',sans-serif;
  },
  barWidth: {
    height: 70,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{
          margin: 0,
          opacity: 1,
          background: "transparent",
          boxShadow: "none",
        }}
        color="primary"
      >
        <Toolbar>
          <img src={logo} alt="" style={{ width: 100, height: 60 }} />
          <Typography variant="h6" className={classes.title}>
            SoteriaX
          </Typography>
          <Button
            variant="text"
            style={{ marginRight: 50, fontWeight: "bold", color: "white" }}
          >
            Contact Us
          </Button>
          <Button
            variant="text"
            style={{ marginRight: 50, fontWeight: "bold", color: "white" }}
          >
            About Us
          </Button>
          <Button color="primary" variant="contained" href="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

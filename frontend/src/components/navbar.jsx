import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import logo from "../assets/icons/logoWhiteWithoutName.png";
import "../assets/css/navbar.css";
import ScrollToColor from "./ScrollToColor";
import InfoIcon from "@material-ui/icons/Info";
import CallIcon from "@material-ui/icons/Call";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
    fontFamily: ['"Orbitron"', "sans-serif"].join(","),
    fontSize: 25,
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
      <ScrollToColor>
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
            <img src={logo} alt="" style={{ width: 80, height: 48 }} />
            <Typography variant="h1" className={classes.title} style={{ fontSize:25 }}>
              SoteriaX
            </Typography>
            <Button
              startIcon={<CallIcon />}
              size="large"
              variant="text"
              style={{
                marginRight: 50,
                // fontWeight: "bold",
                color: "white",
                textTransform: "none",
                fontFamily: "'Lato', sans-serif",
              }}
            >
              Contact Us
            </Button>

            <Button
              startIcon={<InfoIcon />}
              variant="text"
              style={{
                marginRight: 50,
                // fontWeight: "bold",
                color: "white",
                textTransform: "none",
                fontFamily: "'Lato', sans-serif",
              }}
              size="large"
            >
              About Us
            </Button>
            <Button
             startIcon={<ExitToAppIcon />}
              color="primary"
              variant="contained"
              href="/login"
              style={{
                // fontWeight: "bold",
                color: "white",
                textTransform: "none",
                fontFamily: "'Lato', sans-serif",
                // backgroundColor:
              }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </ScrollToColor>
    </div>
  );
}

// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   ThemeProvider,
//   CssBaseline,
//   createMuiTheme
// } from "@material-ui/core";
// import ScrollToColor01 from "./ScrollToColor01";

// const Navbar01scrollToColor = props => {
//   const theme = createMuiTheme();

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />

//       <ScrollToColor01>
//         <AppBar position="static">
//           <Toolbar>
//             <Typography variant="h5" noWrap>
//               {props.title}
//             </Typography>
//           </Toolbar>
//         </AppBar>
//       </ScrollToColor01>
//     </ThemeProvider>
//   );
// };

// export default Navbar01scrollToColor;

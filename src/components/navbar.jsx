import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(() => ({
  palette: {
    secondary: {
      main: '#ff6d33'
    }
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ margin: 0 , opacity:1}} color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            SoteriaX
          </Typography>
          <Button color="primary" variant="contained">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

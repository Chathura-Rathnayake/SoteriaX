import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import image from "../../assets/images/soteriax.png";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import HomeIcon from "@material-ui/icons/Home";
import CallIcon from "@material-ui/icons/Call";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      SoteriaX {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    paddingBottom: "10px",
    position: "relative",
    border: "20%",
    backgroundColor: "white",
    borderRadius: "6px",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
  },
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    size: "50px",
  },
  logo: {
    height: "40%",
    width: "40%",
  },
}));

export default function SetPasswordError(props) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function settingTheError() {
      let status = await props.status;
      if (status == 2) {
        setError("Sorry, the password reset link has expired.");
      } else if (status == 1) {
        setError("Sorry, the password reset link is invalid.");
      }
    }
    settingTheError();
  }, []);

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <Container component="main" maxWidth="xs" className={classes.mainDiv}>
        <div className={classes.paper}>
          <img src={image} className={classes.logo} />
          {error && (
            <Alert severity="error" paddingBottom="10px">
              {error}
            </Alert>
          )}

          <div alignItems="center">
            <br />
            <Button
              startIcon={<HomeIcon />}
              href="/"
              style={{
                marginRight: 50,
                fontWeight: "bold",
              }}
              variant="outlined"
              color="primary"
            >
              Home Page
            </Button>
            <Button
              startIcon={<CallIcon />}
              href="/"
              style={{
                fontWeight: "bold",
              }}
              variant="outlined"
              color="primary"
            >
              Contact Us
            </Button>
          </div>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

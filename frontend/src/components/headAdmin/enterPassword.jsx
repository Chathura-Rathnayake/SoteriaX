import React, { useRef, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import image from "../../assets/images/soteriax.png";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { usePasswordValidation } from "./usePasswordValidation";
import { auth } from "../../firebase";

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
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "fa931d",
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

export default function EnterPassword(props) {
  const { handleInputValue, formIsValid, errors } = usePasswordValidation();

  const classes = useStyles();

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  let userId = "TlWW5XC4xMYa7o0SGGHTMW1STWp2"; //removing this hardcoding - retrieve this from props

  //function to handle the submit click
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log(passwordRef.current.value);
      console.log(passwordConfirmRef.current.value);
      if (passwordRef.current.value === passwordConfirmRef.current.value) {
        // update the user password by performing an backend API call
        // history.push("/test"); //to the
      } else {
        setError("Two Passwords Does Not Match");
      }
    } catch {
      setError("Failed to set the password");
      console.log("error");
    }

    setLoading(false);
  }

  return (
    <div>
      <Container component="main" maxWidth="xs" className={classes.mainDiv}>
        <div className={classes.paper}>
          <img src={image} className={classes.logo} />
          {error && <Alert severity="error">{error}</Alert>}

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              inputRef={passwordRef}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter a new password"
              type="password"
              id="password"
              onChange={handleInputValue}
              onBlur={handleInputValue}
              error={errors["password"]}
              autoFocus
              {...(errors["password"] && {
                error: true,
                helperText: errors["password"],
              })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm the password"
              type="password"
              id="passwordConfirm"
              inputRef={passwordConfirmRef}
              onChange={handleInputValue}
              onBlur={handleInputValue}
              error={errors["passwordConfirm"]}
              autoFocus
              {...(errors["passwordConfirm"] && {
                error: true,
                helperText: errors["passwordConfirm"],
              })}
            />
            <div align="center">
              <Button
                disabled={loading}
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
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ width: "130px" }}
                onClick={handleSubmit}
                disabled={!formIsValid()}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );

  //<h1>Welcome back! {props.status}</h1>;
}

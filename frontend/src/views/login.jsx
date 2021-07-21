import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import image from "./soteriax.png";
import MaterialLink from '@material-ui/core/Link';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        SoteriaX
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  bgImage: {
    opacity: 0.4,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "auto",
  },
  mainDiv: {
    position: "relative",
    //opacity:"1 !important",
    boarder: "20%",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
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

console.log();

const Login = () => {
  const classes = useStyles();

  //firebase authentication
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);
      if (
        emailRef.current.value.toUpperCase() ===
        process.env.REACT_APP_ADMIN_EMAIL.toUpperCase()
      ) {
        //TODO - validate user from his/her collection
        history.push("/admin"); //to the admin dashboard
      } else {
        history.push("/adashboard"); //to the headlife dashboard
      }
    } catch {
      setError("Failed to log in");
      console.log("error");
    }

    setLoading(false);
  }

  return (
    <div>
      <img
        className={classes.bgImage}
        src="https://images.unsplash.com/photo-1611222566295-885a2c99153a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        alt=""
      ></img>
      <div>
        <Container component="main" maxWidth="xs" className={classes.mainDiv}>
          <CssBaseline />
          <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
            <img src={image} className={classes.logo} />
            {/* <Link to="/"></Link> */}
            {/* give this as an error */}

            {error && (
              <Alert severity="error">Login Failed.! Please try again.</Alert>
            )}

            {/* <div className={classes.root}>
            <IconButton aria-label="delete">
            <img src="https://img.icons8.com/office/16/000000/google-logo.png" className={classes.IconButton}/>
            </IconButton>
      
        </div> */}
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                inputRef={emailRef}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />

              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                //style={{backgroundColor: '#fa931d', color: '#FFFFFF'}}
                className={classes.submit}
              >
                Sign In
              </Button>
              <div style={{ alignItems: "center" }}>
                {/* fix this (the Link vs Link conflict) */} 
                <MaterialLink href="/forgetPassword" variant="body2">
                Forgot password?
              </MaterialLink>
              </div>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Login;

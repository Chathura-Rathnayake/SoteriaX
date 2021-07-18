import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import image from './soteriax.png';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {fire, db} from '../fire';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                SoteriaX
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    bgImage:{
        opacity: 0.4,
        position: 'absolute',
        left: 0,
        top: 0,
        width: "100%",
        height: "auto",
    },
    mainDiv:{
        position:"relative",
        //opacity:"1 !important",
        boarder:"20%",
        backgroundColor: "white",
        borderRadius: "10px",
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
        color:"fa931d",
      },
      root: {
        '& > *': {
          margin: theme.spacing(1),
        },
        size:"50px",
      },
      logo:{
          height:"40%",
          width:"40%",

      },

}));



const AddUser = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const createUserAndSaveDetails = ()=>{
    console.log("clicked");
    fire.auth().createUserWithEmailAndPassword(email, password).then((res)=>{
    db.collection("userDetails").add({
        email : email,
        userName : userName
    }).then(()=>{
        console.log("added successfully")
    }).catch((err)=>{
        console.log("not added")
    })
    }).catch((err)=>{
    console.log(err)
    })
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

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e)=>{setUserName(e.target.value)}}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={createUserAndSaveDetails}
          >
            Sign Up
          </Button>

        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>

        </div></div>
   
    );
}

export default AddUser;
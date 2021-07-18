import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import image from './soteriax.png';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
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
        paddingBottom:50,
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



const ForgetPassword = () => {
    const classes = useStyles();

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
        <Typography component="h1" variant="h5">
          Forgot Password? 
        </Typography>

        
        {/* <div className={classes.root}>
            <IconButton aria-label="delete">
            <img src="https://img.icons8.com/office/16/000000/google-logo.png" className={classes.IconButton}/>
            </IconButton>
      
        </div> */}
        <form className={classes.form} noValidate>
          <TextField
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
          <br/><br/>
        <div class={{marginBottom:100}}> 
          <Typography variant="h10" color="textSecondary" align={"center"}>
              Request link will be sent to your email. Please click the link and reset your password.
          </Typography>
          <br/><br/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //style={{backgroundColor: '#fa931d', color: '#FFFFFF'}}
            className={classes.submit}
          >
            Reset Password
          </Button>
          </div>
        </form> 
      </div>
    </Container>

        </div></div>
   
    );
}

export default ForgetPassword;
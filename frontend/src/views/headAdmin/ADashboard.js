import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SimpleCard from "../../components/headAdmin/SimpleCard";
// import Simplemap from "../../components/headAdmin/Simplemap";
import Grid from "@material-ui/core/Grid";
import Layout from "../../components/headAdmin/Layout";
import { useAuth } from "../../contexts/AuthContext.js";

const useStyles = makeStyles({
  bot: {
    marginBottom: 30,
  },
});

export default function ADashboard() {
  const classes = useStyles();
  const { currentUser } = useAuth();

  // //performing an API request
  // useAuth()
  //   .currentUser.getIdToken(true) //getting the currently logged in user's id token from firebase
  //   .then((idToken) => {

  //     //the complete object that is needed to sent to the backend
  //     const toSend = {
  //       username: "harcana", //some other data
  //       token: idToken, //the token
  //     };

  //     // Send the data to the backend
  //     fetch("/send", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(toSend),
  //     })
  //       .then((res) => res.json()) //retrieving the request from backend
  //       .then((data) => console.log(data)); //printing it to the console
  //   })
  //   .catch(function (error) {
  //     // Handle the error
  //   });

  //performing an API request

  async function myFunc() {
    const idToken = await currentUser.getIdToken(true); //get the token of the current user
    const toSend = {
      token: idToken,
    };
    try {
      fetch("/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(toSend),
      })
        .then((res) => res.json()) //retrieving the request from backend
        .then((data) => console.log(data)); //printing it to the console
    } catch (err) {
      console.log(err);
    }
  }

  myFunc(); //executing the async function

  //an example on how to do this inside the useEffect hook
  useEffect(() => {
    async function someFunc() {
      const idToken = await currentUser.getIdToken(true); //get the token of the current user
      const toSend = {
        token: idToken,
      };
    
    try {
      const urls = [
        "/getOperationCount",
        "/getTrainingCount",
        // "/getMemberCount",
        // "/latestOperationtime",
        // "/latestTrainingtime",
      ];
        var data = await Promise.all(
            urls.map(
                url =>
                    fetch(url).then(
                        (response) => response.json()
                    )));
        console.log(data)    
        return (data)
                  
    } catch (error) {
        console.log(error)

        throw (error)
    }
    }
    someFunc();
       //executing it
  }, []);

  return (
    <Layout>
      <Container size="sm">
        <Typography variant="h6" color="textSecondary">
          Dashboard - {currentUser.email}
        </Typography>
{/* 
        <Simplemap /> */}
        <div class={classes.bot}></div>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <SimpleCard name="Incidents Logged" num="0" />
          </Grid>
          <Grid item xs={4}>
            <SimpleCard name="Members Registered" num="0" />
          </Grid>
          <Grid item xs={4}>
            <SimpleCard name="Training sessions" num="0" />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

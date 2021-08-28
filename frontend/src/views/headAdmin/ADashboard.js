import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SimpleCard from "../../components/headAdmin/SimpleCard";
import Simplemap from "../../components/headAdmin/Simplemap";
import Grid from "@material-ui/core/Grid";
import Layout from "../../components/headAdmin/Layout";
import { useAuth } from "../../contexts/AuthContext.js";

const useStyles = makeStyles({
  bot: {
    marginBottom: 10,
  },
});

export default function ADashboard() {
  const classes = useStyles();

  //performing an API request
  useAuth()
    .currentUser.getIdToken(true) //getting the currently logged in user's id token from firebase
    .then((idToken) => {

      //the complete object that is needed to sent to the backend
      const toSend = {
        username: "harcana", //some other data
        token: idToken, //the token
      };

      // Send the data to the backend
      fetch("/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(toSend),
      })
        .then((res) => res.json()) //retrieving the request from backend
        .then((data) => console.log(data)); //printing it to the console
    })
    .catch(function (error) {
      // Handle the error
    });

  return (
    <Layout>
      <Container size="sm">
        <Typography variant="h6" color="textSecondary">
          Dashboard - Lifecorp(Pvt) Ltd
        </Typography>

        <Simplemap />
        <div class={classes.bot}></div>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <SimpleCard name="Incidents Logged" num="0" />
          </Grid>
          <Grid item xs={3}>
            <SimpleCard name="Members Registered" num="0" />
          </Grid>
          <Grid item xs={3}>
            <SimpleCard name="Users Active" num="0" />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

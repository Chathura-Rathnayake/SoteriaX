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
  top: {
    marginTop: 50,
  },
});

export default function ADashboard() {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [dataC, getDataC] = useState([]);
  const [dataO, getDataO] = useState([]);
  const [dataT, getDataT] = useState([]);
  const [dataL, getDataL] = useState([]);
  const [dataLO, getDataLO] = useState([]);
  const [loading, setLoading] = React.useState(false)
  
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

  // async function myFunc() {
  //   const idToken = await currentUser.getIdToken(true); //get the token of the current user
  //   const toSend = {
  //     token: idToken,
  //   };
  //   try {
  //     fetch("/send", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(toSend),
  //     })
  //       .then((res) => res.json()) //retrieving the request from backend
  //       .then((data) => console.log(data)); //printing it to the console
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // myFunc(); //executing the async function

  //an example on how to do this inside the useEffect hook
  // useEffect(() => {
  //   async function someFunc() {
  //     const idToken = await currentUser.getIdToken(true); //get the token of the current user
  //     const toSend = {
  //       token: idToken,
  //     };
    
  //   try {
  //     const urls = [
  //       "/getOperationCount",
  //       "/getTrainingCount",
  //       // "/getMemberCount",
  //       // "/latestOperationtime",
  //       // "/latestTrainingtime",
  //     ];
  //       var data = await Promise.all(
  //           urls.map(
  //               url =>
  //                   fetch(url).then(
  //                       (response) => response.json()
  //                   )));
  //       console.log(data)    
  //       return (data)
                  
  //   } catch (error) {
  //       console.log(error)

  //       throw (error)
  //   }
  //   }
  //   someFunc();
  //      //executing it
  // }, []);

  useEffect(() => {
    setLoading(true)
    async function getList() {
      const idToken = await currentUser.getIdToken(true); //get the token of the current user
      const toSend = {
        token: idToken,
      };
      try {
        fetch("/getCompanyName", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend),
        })
          .then((res) => res.json()) //retrieving the request from backend
          .then((data) => getDataC(data)); //printing it to the console
      } catch (err) {}
      try {
        fetch("/getOperationCount", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend),
        })
          .then((res) => res.json()) //retrieving the request from backend
          .then((data) => getDataO(data)); //printing it to the console
      } catch (err) {}
      try {
        fetch("/getTrainingCount", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend),
        })
          .then((res) => res.json()) //retrieving the request from backend
          .then((data) =>getDataT(data)); //printing it to the console
      } catch (err) {}
      try {
        fetch("/getLifeguardCount", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend),
        })
          .then((res) => res.json()) //retrieving the request from backend
          .then((data) =>getDataL(data)); //printing it to the console
      } catch (err) {}
      try {
        fetch("/getlatestDataOperation", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend),
        })
          .then((res) => res.json()) //retrieving the request from backend
          .then((data) =>getDataLO(data)); 
          setLoading(false)//printing it to the console
      } catch (err) {}
    }
    getList(); //executing it
  }, []);
  console.log("latest O",dataLO)
  var pilots = dataL.filter(function(getpilots){
    return getpilots.isPilot == true;
  });

  var non_pilots = dataL.filter(function(getpilots){
    return getpilots.isPilot == false;
  });

  dataT.sort((a, b) => {
    let da = new Date(a.date),
      db = new Date(b.date);
    return db - da;
  });
  var completedData = dataT.filter(function (sessions) {
    return sessions.completed == true;
  });

  var scheduledData = dataT.filter(function (sessions) {
    return sessions.completed != true;
  });
  

  return (
    <Layout>
      <Container size="sm">
      <div class={classes.bot}></div>
        <Typography  variant="h3" align="center" color="textSecondary">
         <strong> {dataC.companyName} </strong> 
        </Typography>
        <div class={classes.bot}></div>

{/* 
        <Simplemap /> */}
        <div class={classes.bot}></div>
       
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <div class={classes.top}></div>
            <SimpleCard name="Incidents Logged" num={dataO.length  } loading ={loading}  />
          </Grid>
          <Grid item xs={4}>
          <div class={classes.top}></div>
            <SimpleCard  name="Lifeguards Added" num={non_pilots.length
          } loading ={loading} />
          </Grid>
          <Grid item xs={4}>
          <div class={classes.top}></div>
            <SimpleCard  name="Drone Pilots Added" num= {pilots.length} loading ={loading}  />
          </Grid>
          <Grid container spacing={10}>
          <Grid  item xs={6}>
          <div class={classes.top}></div>
            <SimpleCard  name="Completed Training Sessions" num={completedData.length} loading ={loading}  />
          </Grid>
          <Grid item xs={6}>
          <div class={classes.top}></div>
            <SimpleCard  name="Scheduled Training Sessions" num={scheduledData.length} loading ={loading} />
            </Grid>
          </Grid>
          
          <Typography  variant="h6" color="textSecondary">
          <div class={classes.top}></div>
          Last Operation commenced Date - {dataLO.map((data)=>
            data.startDate
          )}
        </Typography>

       
        </Grid>

      </Container>
    </Layout>
  );
}

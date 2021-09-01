import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Layout from "../../components/headAdmin/Layout";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { useAuth } from "../../contexts/AuthContext.js";


const useStyles = makeStyles({
  bot: {
    marginBottom: 10,
  },
  bot50: {
    marginBottom: 50,
  },
  top50: {
    marginTop: 20,
  },
  card: {
    marginTop: "30px",
    marginLeft: "50px",
  },
  bold600: {
    fontWeight: 600,
  },
  bold400: {
    fontWeight: 400,
  },
});

export default function Training() {
  const classes = useStyles();
  const [userlist, getUsers] = useState([]);
  const [state, setState] = React.useState({
    type: "",
    
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    async function getUserList() {
      const idToken = await currentUser.getIdToken(true); //get the token of the current user
      const toSend = {
        token: idToken,
      };
      try {
        fetch("/trainingView", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend),
        })
          .then((res) => res.json()) //retrieving the request from backend
          .then((data) => getUsers(data)); //printing it to the console
      
        } catch (err) {
        //
      }
    }
    getUserList(); //executing it
  }, []);
  var pilots = userlist.filter(function(getpilots){
    return getpilots.isPilot == true;
  });

  var non_pilots = userlist.filter(function(getpilots){
    return getpilots.isPilot == false;
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  function handleSubmit(e) {
    e.preventDefault();
    const {msg,sea,packageH,rescuer,pilot} = e.target.elements
    // if(packageH.value == rescuer.value){
    //   alert("pick diffrent user")
    // }
    
    var formdata = {
        Summary:msg.value,
        SeaCondition:sea.value,
        Package:packageH.value,
        Rescuer:rescuer.value,
        Pilot:pilot.value,
        
      
    };  
    console.log(formdata);
    // FromdataTranfer(formdata);
  }

  return (
    <Layout>
      <Container size="sm">
        <div class={classes.top50}>
          <Typography
            className={classes.bold600}
            variant="h4"
            align="center"
            color="textSecondary"
            font
          >
            Initiate Training Session
          </Typography>
          {/* <div>

      <h1>The Age: {userlist[0]}</h1>
    </div> */}
          <div class={classes.bot50}></div>
        </div>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div>
                <div style={{ marginTop: "10px", marginLeft: "50px" }}>
                  <Grid container spacing={5} autoComplete="off">
                    <Grid item xs={2}>
                      <Typography size="12px" color="textSecondary">
                        Summary:

                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        style={{ width: "80%" }}
                        name="msg"
                        multiline
                        rows={8}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography size="12px" color="textSecondary">
                        Sea Conditions:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                       name="sea"
                        native
                        defaultValue={1}
                        value={state.types}
                        style={{ width: "60%" }}      
                        onChange={handleChange}
                      >
                        <option value={1}>Mild</option>
                        <option value={2}>Moderate</option>
                        <option value={3}>Rough</option>
                      </Select>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography size="12px" color="textSecondary">
                        Package Handler:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        name="packageH"
                        native
                        style={{ width: "60%" }}
                        onChange={handleChange}
                      >
                          {non_pilots.map((user) => (
                            
                            <option value={user.id}>{user.firstName} {user.lastName}</option>
                          ))}

                      </Select>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography size="12px" color="textSecondary">
                        Rescuer:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        name="rescuer"
                        native
                        style={{ width: "60%" }}
                        onChange={handleChange}
                      >
                          {non_pilots.map((user) => (
                            <option value={user.empID}>{user.firstName} {user.lastName}</option>
                          ))}

                      </Select>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography size="12px" color="textSecondary">
                        Drone Pilot:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        name="pilot"
                        native
                        style={{ width: "60%" }}
                        onChange={handleChange}
                      >
                          {pilots.map((user) => (
                            <option value={user.empID}>{user.firstName} {user.lastName}</option>
                          ))}

                      </Select>
                    </Grid>
                  </Grid>
                  <div style={{ marginTop: "50px", marginLeft: "50px" }}>
                    <Button
                      type="submit"
                      value="Submit"
                      variant="contained"
                      color="secondary"
                      size="medium"
                      style={{ marginLeft: 25 }}
                      onClick={() => { }}
                    >
                      Procced To Training
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

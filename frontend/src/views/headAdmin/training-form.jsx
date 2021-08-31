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
  const [userlist, getUsers] = useState([{}]);
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
        console.log(err);
      }
    }
    getUserList(); //executing it
  }, []);

  const lifeguards = userlist.lifeguards;
  const options = [
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Mango",
      value: "mango",
    },
    {
      label: "Banana",
      value: "banana",
    },
    {
      label: "Pineapple",
      value: "pineapple",
    },
  ];
  // const arr = Object.values(lifeguards);
  //  console.log(arr) 
  const [state, setState] = useState({
    types: ""
  });
  const handleHandelerChange = (e) => {
    getUsers(e.target.value)
  }
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

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
            <form noValidate autoComplete="off">
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
                        id="summery"
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
                        native
                        style={{ width: "60%" }}
                        defaultValue={1}
      
                        onChange={handleChange}
                        inputProps={{
                          name: "type",
                          id: "filled-age-native-simple",
                        }}
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
                        native
                        style={{ width: "60%" }}
                        onChange={handleHandelerChange}
                      >
                          {options.map((user) => (
                            <option value={user.dui}>{user.label}</option>
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
                        native
                        style={{ width: "60%" }}
                        defaultValue={3}
                        value={state.types}
                        onChange={handleChange}
                        inputProps={{
                          name: "type",
                          id: "filled-age-native-simple",
                        }}
                      >
                        <option value={1}>Kumara Dasanayeka</option>
                        <option value={2}>Sarath Gunasingha</option>
                        <option value={3}>Amal Kularathne</option>
                        <option value={4}>Jagath Silva</option>
                        <option value={5}>Sahan Fernando</option>
                      </Select>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography size="12px" color="textSecondary">
                        Drone Pilot:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        native
                        style={{ width: "60%" }}
                        defaultValue={4}
                        value={state.types}
                        onChange={handleChange}
                        inputProps={{
                          name: "type",
                          id: "filled-age-native-simple",
                        }}
                      >
                        <option value={1}>Kumara Dasanayeka</option>
                        <option value={2}>Sarath Gunasingha</option>
                        <option value={3}>Amal Kularathne</option>
                        <option value={4}>Jagath Silva</option>
                        <option value={5}>Sahan Fernando</option>
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

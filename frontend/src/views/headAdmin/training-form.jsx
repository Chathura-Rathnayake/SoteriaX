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
import Notification from "../../components/headAdmin/Notification";

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
  var date = new Date().getDate();

  const classes = useStyles();
  const [userlist, getUsers] = useState([]);
  const [state, setState] = React.useState({ type: "" });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
    num: "200",
  });
  let uid;
  useAuth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      uid = idToken;
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
  var pilots = userlist.filter(function (getpilots) {
    return getpilots.isPilot == true;
  });

  var non_pilots = userlist.filter(function (getpilots) {
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
    const { title, date, time, msg, sea, packageH, rescuer, pilot } =
      e.target.elements;
    // var str=pilot.value;
    var arry1 = pilot.value.split(",");
    var arry2 = rescuer.value.split(",");
    var arry3 = packageH.value.split(",");
    var formdata = {
      title: title.value,
      date: date.value,
      time: time.value,
      Summary: msg.value,
      SeaCondition: sea.value,
      Pilot: arry1[0],
      PilotName: arry1[1] + " " + arry1[2],
      Rescuer: arry2[0],
      RescuerName: arry2[1] + " " + arry2[2],
      Package: arry3[0],
      PackageName: arry3[1] + " " + arry3[2],
      token: uid,
      dateTime: new Date(date.value+'T'+time.value)

    };

    function invalidDate(getDate, getTime) {
      var GivenDate = getDate;
      console.log("new format", new Date(getDate));
      var CurrentDate = new Date().toISOString().split("T")[0];
      var currentHours = new Date().getHours();
      currentHours = ("0" + currentHours).slice(-2);
      var CurrentTime = currentHours + ":" + new Date().getMinutes();
      console.log(GivenDate);
      console.log(CurrentDate);
      GivenDate = new Date(GivenDate);
      CurrentDate = new Date(CurrentDate);
      // GivenDate > CurrentDate &&
      if (GivenDate > CurrentDate) {
        return false;
      } else if (GivenDate.toDateString() == CurrentDate.toDateString()) {
        console.log("same");
        console.log("getTime", getTime);
        console.log("Time", CurrentTime);
        if (getTime > CurrentTime) {
          return false;
          console.log("ok");
        } else {
          console.log("not ok");
          return true;
        }
      } else {
        return true;
      }
    }
    if (packageH.value == 0 || rescuer.value == 0 || pilot.value == 0) {
      setNotify({
        isOpen: true,
        message: "No available Lifeguards, Create new lifeguards",
        type: "error",
        num: 80,
      });
      return;
    } else if (
      !title.value ||
      !date.value ||
      !time.value ||
      !msg.value ||
      !sea.value
    ) {
      setNotify({
        isOpen: true,
        message: "Empty input fields detected",
        type: "error",
        num: 80,
      });
      return;
    } else if (invalidDate(date.value, time.value)) {
      setNotify({
        isOpen: true,
        message: "Please select a Future Date & Time",
        type: "error",
        num: 80,
      });
      return;
    } else {
      if (packageH.value == rescuer.value) {
        setNotify({
          isOpen: true,
          message: "Please select unique lifeguards for each action",
          type: "error",
          num: 80,
        });

        return;
      }
      FromdataTranfer(e, formdata);
      console.log(formdata);
    }
  }
  function FromdataTranfer(e, data) {
    fetch("/CreateTrainingSession", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((respond) => {
        if (respond) {
          e.target.reset();
          setNotify({
            isOpen: true,
            message: "Training Session Scheduled successfully",
            type: "success",
            num: 80,
          });
        }
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          message: "Error Occured, Please try again later",
          type: "error",
          num: 80,
        });
      });
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
          <div class={classes.bot50}></div>
        </div>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div>
                <div style={{ marginTop: "10px", marginLeft: "50px" }}>
                  <Grid container spacing={5} autoComplete="off">
                    <Grid item xs={12}>
                      <TextField
                        required={true}
                        name="title"
                        label="Training Title"
                        style={{ width: "80%" }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography size="12px" color="textSecondary">
                        Date-time:
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        required={true}
                        id="date"
                        label="Training Day"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required={true}
                        id="time"
                        label="Time"
                        type="time"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={
                          {
                            // 5 min
                          }
                        }
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography size="12px" color="textSecondary">
                        Description:
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        required={true}
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
                        required={true}
                        name="sea"
                        native
                        defaultValue={1}
                        value={state.types}
                        style={{ width: "60%" }}
                        onChange={handleChange}
                      >
                        <option value={"Mild"}>Mild</option>
                        <option value={"Moderate"}>Moderate</option>
                        <option value={"Rough"}>Rough</option>
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
                        {non_pilots.length ? (
                          non_pilots.map((user) => (
                            <option
                              value={[user.id, user.firstName, user.lastName]}
                            >
                              {user.firstName} {user.lastName}
                            </option>
                          ))
                        ) : (
                          <option value={0}>No Available Lifeguards</option>
                        )}
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
                        {non_pilots.length ? (
                          non_pilots.map((user) => (
                            <option
                              value={[user.id, user.firstName, user.lastName]}
                            >
                              {user.firstName} {user.lastName}
                            </option>
                          ))
                        ) : (
                          <option value={0}>No Available Lifeguards</option>
                        )}
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
                        {pilots.length ? (
                          pilots.map((user) => (
                            <option
                              value={[user.id, user.firstName, user.lastName]}
                            >
                              {user.firstName} {user.lastName}
                            </option>
                          ))
                        ) : (
                          <option value={0}>No Available Lifeguards</option>
                        )}
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
                      onClick={() => {}}
                    >
                      Schedule Training
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Grid>
        </Grid>
        <Notification notify={notify} setNotify={setNotify} />
      </Container>
    </Layout>
  );
}

import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Layout from "../../components/headAdmin/Layout";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { useAuth } from "../../contexts/AuthContext.js";
import { useHistory} from 'react-router-dom'
import Notification from "../../components/headAdmin/Notification";
const useStyles = makeStyles({
  bot: {
    marginBottom: 10,
  },
  top50: {
    marginTop: 20,
  },
  top70: {
    marginTop: 70,
  },
  card: {
    marginTop: "30px",
    marginLeft: "50px",
  },
  bold400: {
    fontWeight: 600,
  },
});

export default function Support() {
  const classes = useStyles();
  const history = useHistory();
  let uid;

  useAuth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      uid = idToken;
    });

  function FromdataTranfer(data) {
    fetch("/headguardSupport", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())

      .then((data) => {
        setNotify({
          isOpen: true,
          message:
            "Successfully Submitted. \n\
           Your Reference Number: " +
            data,
          type: "success",
        });
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          message: "Error Occured, Please try again later",
          type: "failed",
        });
      });
  }
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [response, setResponse] = useState();
  const [state, setState] = React.useState({
    type: "",});
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { type, msg, headline } = e.target.elements;
    var formdata = {
      type: type.value,
      headline: headline.value,
      msg: msg.value,
      token: uid,
    };

    FromdataTranfer(formdata);
  }


  return (
    <Layout>
      <Container size="sm">
        <div class={classes.top50}>
          <Typography
            variant="h5"
            className={classes.bold400}
            color="textSecondary"
          >
            Contact SoteriaX support center
          </Typography>
        </div>
        <div class={classes.top70}></div>
        <Grid>
          <Grid item xs={10}>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div>
                <div style={{ marginTop: "10px", marginLeft: "50px" }}>
                  <Grid container spacing={5} autoComplete="off">
                    <Grid item xs={4}>
                      <Typography size="12px" color="textSecondary">
                        Service Type:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        name="type"
                        native
                        style={{ width: "60%" }}
                        defaultValue={1}
                        value={state.types}
                        onChange={handleChange}
                        inputProps={{
                          name: "type",
                          id: "filled-age-native-simple",
                        }}
                      >
                        <option value={1}>Help Requests</option>
                        <option value={2}>Complaints</option>
                        <option value={3}>Suggestions</option>
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required={true}
                        name="headline"
                        label="Subject line"
                        style={{ width: "80%" }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required={true}
                        style={{ width: "80%" }}
                        name="msg"
                        label="State your request here"
                        multiline
                        rows={8}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <div style={{ marginTop: "50px", marginLeft: "50px" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="medium"
                      style={{ marginLeft: 25 }}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={() => { history.push('/requestInbox') }}
                      variant="contained"
                      color="secondary"
                      size="medium"
                      style={{ marginLeft: 125 }}
                    >
                      View previous requests
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Grid>

          <div className={classes.root}>

          </div>

          <Notification notify={notify} setNotify={setNotify} />
        </Grid>
      </Container>
    </Layout>
  );
}

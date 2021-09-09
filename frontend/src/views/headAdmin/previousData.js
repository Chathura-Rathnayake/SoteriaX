import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Layout from "../../components/headAdmin/Layout";
import Grid from "@material-ui/core/Grid";
import MsgCard from "../../components/headAdmin/MsgCard";
import Container from "@material-ui/core/Container";
import { useAuth } from "../../contexts/AuthContext.js";
import CircularProgress from "@material-ui/core/CircularProgress";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}
function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    backgroundColor: theme.palette.background.paper,
  },
  bigIndicator: {
    height: 6,
  },
}));

export default function RequestData() {
  const [data, getData] = useState([]);
  const [dataComplaints, getDataComplaints] = useState([]);
  const [dataSuggestions, getDataSuggestions] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    async function getList() {
      const idToken = await currentUser.getIdToken(true); //get the token of the current user
      const toSend = {
        token: idToken,
      };
      try {
        fetch("/supportData", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend),
        })
          .then((res) => res.json()) //retrieving the request from backend
          .then((data) => getData(data)); //printing it to the console
        setLoading(false);
      } catch (err) {}
      try {
        fetch("/supportDataComplaints", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend),
        })
          .then((res) => res.json()) //retrieving the request from backend
          .then((data) => getDataComplaints(data)); //printing it to the console
      } catch (err) {}
      try {
        fetch("/supportDataSuggestions", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend),
        })
          .then((res) => res.json()) //retrieving the request from backend
          .then((data) => getDataSuggestions(data)); //printing it to the console
      } catch (err) {}
    }
    getList(); //executing it
  }, []);
  data.sort((a, b) => {
    let da = new Date(a.date),
      db = new Date(b.date);
    return db - da;
  });
  dataComplaints.sort((a, b) => {
    let da = new Date(a.date),
      db = new Date(b.date);
    return db - da;
  });
  dataSuggestions.sort((a, b) => {
    let da = new Date(a.date),
      db = new Date(b.date);
    return db - da;
  });
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            classes={{ indicator: classes.bigIndicator }}
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            color="primary"
          >
            <LinkTab label="Help Requests" {...a11yProps(0)} />
            <LinkTab label="Complaints" {...a11yProps(1)} />
            <LinkTab label="Sugguestions" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <Container size="sm">
            <Grid container spacing={4}>
              {loading ? (
                <CircularProgress
                  style={{ marginLeft: "45%", marginTop: "10%" }}
                  color="secondary"
                />
              ) : (
                data.map((entry) => (
                  <Grid item xs={12}>
                    <MsgCard
                      id={entry.docID}
                      status={entry.status > 0 ? "Completed" : "Pending"}
                      headline={entry.headline}
                      msg={entry.msg}
                      reply={entry.reply}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Container size="sm">
            <Grid container spacing={4}>
              {dataComplaints.length ? (
                dataComplaints.map((entry) => (
                  <Grid item xs={12}>
                    <MsgCard
                      id={entry.docID}
                      status={entry.status > 0 ? "Completed" : "Pending"}
                      headline={entry.headline}
                      msg={entry.msg}
                      reply={entry.reply}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography
                    style={{ marginTop: "50px", marginBottom: "50px" }}
                    size="12px"
                    align="center"
                    color="textSecondary"
                  >
                    <strong>No Records Submitted</strong>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Container size="sm">
            <Grid container spacing={4}>
              {dataSuggestions.length ? (
                dataSuggestions.map((entry) => (
                  <Grid item xs={12}>
                    <MsgCard
                      id={entry.docID}
                      status={entry.status > 0 ? "Completed" : "Pending"}
                      headline={entry.headline}
                      msg={entry.msg}
                      reply={entry.reply}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  {}
                  <Typography
                    style={{ marginTop: "50px", marginBottom: "50px" }}
                    size="12px"
                    align="center"
                    color="textSecondary"
                  >
                    <strong>No Records Submitted</strong>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Container>
        </TabPanel>
      </div>
    </Layout>
  );
}

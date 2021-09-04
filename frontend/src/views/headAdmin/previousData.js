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
  const { currentUser } = useAuth();

  useEffect(() => {
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
      } catch (err) {
        //
      }
    }
    getList(); //executing it
  }, []);
  console.log(data)
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
              {data.map((entry) => (
                <Grid item xs={12}>
                  <MsgCard
                    id={entry.docID}
                    status={entry.status > 0 ? 'Completed' : 'Pending'}
                    headline={entry.headline}
                    msg={entry.msg}
                    reply={entry.reply}
                  />
                </Grid>


              ))}


            </Grid>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <form noValidate autoComplete="off">
            <div style={{ marginTop: "50px", marginLeft: "50px" }}></div>
          </form>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <div style={{ height: "400px", width: "100%" }}></div>
        </TabPanel>
      </div>
    </Layout>
  );
}

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Layout from "../../components/headAdmin/Layout";
import { VideoCard } from "material-ui-player";
import footage from "../../assets/vid/footage.mp4";
import Grid from "@material-ui/core/Grid";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  bot: {
    marginBottom: 10,
  },
  bold400: {
    fontWeight: 600,
  },
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
export default function Live() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Typography
            className={classes.bold400}
            variant="h4"
            align="center"
            color="textSecondary"
          >
            Live Operation
          </Typography>
        </Grid>
        <Grid item lg={8}>
          <VideoCard
            src={footage}
            autoplay="true"
            width="700"
            height="520"
            thickness="thin"
            fadeInTime="2"
            fadeOutTime="2"
            PlayProps
          />
        </Grid>
        <Grid item lg={4}>
          <Grid item lg={12}>
            <Container align="left">
              <Timeline align="alternate">
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>Mission Initiated </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>Drone Takeoff </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot variant="outlined" color="secondary" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>Reached Victim </Typography>{" "}
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot variant="outlined" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>Restube Dropped </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot variant="outlined" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>Lifeguard Reached </Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot variant="outlined" />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>Mission Completed </Typography>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Container>
            <Typography align="right" className={classes.bold400} size="10px">
              Emergency Code : 200 Lock Malfunction{" "}
            </Typography>
          </Grid>
        </Grid>
        <Grid item lg={12}>
          {/* <div>
            <Button onClick={handleClick}>Emergency Code</Button>
            <Snackbar
              autoHideDuration= {1000000},
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "Right",
              }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Lock Malfunction"
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </div> */}
        </Grid>
      </Grid>
      <Container size="sm"></Container>
    </Layout>
  );
}

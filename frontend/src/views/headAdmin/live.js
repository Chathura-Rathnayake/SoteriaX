import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Layout from "../../components/headAdmin/Layout";
// import { VideoCard } from "material-ui-player";
// import footage from "../../assets/vid/footage.mp4";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
// import Icon from "@material-ui/core/Icon";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

import Button from "@material-ui/core/Button";
// import Snackbar from "@material-ui/core/Snackbar";
// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
// import { CardMedia } from "@material-ui/core";
// import ReactPlayer from "react-player";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import InfoIcon from "@material-ui/icons/Info";
import droneView from "../../assets/images/droneView.png";

import CircularProgress from "@material-ui/core/CircularProgress";

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

  //Code segment to handle the real time video streaming
  async function handleVideoButtonClick(e) {
    console.log("clicked");
    const peer = createPeer();
    //creates a pipe between consumer and server - a two way channel but here the direction is set as one way
    peer.addTransceiver("video", { direction: "recvonly" });
  }

  function createPeer() {
    const peer = new RTCPeerConnection();
    //STUN server configurations
    //   {
    //   iceServers: [
    //     {
    //       urls: "stun:stun.stunprotocol.org:3478",
    //     },
    //   ],
    // }
    peer.ontrack = handleTrackEvent; //listen to ontrack event (to receive the broadcaster's(RasberryPi's) stream from the server)
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer); //the negotiation
    return peer;
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer(); //create my offer
    await peer.setLocalDescription(offer); //set it as the local description

    /*defining the data to be send to the raspberryPi
     sdp --> my sdp
     missionType --> whether it is an training or an operation
     missionId --> document id of the mission
    */

    //encoding it before send - so that it is compatible with mobile application requests
    const sdpToSend = JSON.stringify(peer.localDescription);

    const payload = {
      sdp: sdpToSend,
      missionType: "", //these values are only defined in mobile requests
      missionId: "", //these values are only defined in mobile requests
    };

    console.log("hello");
    console.log(peer.localDescription);
    const { data } = await axios.post(
      "http://localhost:5000/consumer", //ip address and port of the raspberry pi server (this is currently hardcoded)
      payload
    );
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e)); //setting the remote description
  }

  function handleTrackEvent(e) {
    console.log(e.streams[0]);
    // console.log(e.streams[0]);

    // if (document.getElementById("video").srcObject) {
    //   console.log("if");
    //   return;
    // } else {
    //   console.log("else");
    //   document.getElementById("video").srcObject = e.streams[0];
    // }
    document.getElementById("video").srcObject = e.streams[0]; //sending the strem to the front end video tag
  }
  //end of the realtime stream handler code
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item lg={12}></Grid>
        <Grid item lg={7}>
          <video
            style={{
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
              borderRadius: "7px",
            }}
            poster={droneView}
            width="704"
            height="528"
            autoPlay
            id="video"
            controls
          ></video>
          <Button
            id="my-button"
            variant="contained"
            color="primary"
            onClick={handleVideoButtonClick}
            startIcon={<PlayArrowIcon />}
          >
            Watch Live Stream
          </Button>

          <Button
            style={{ margin: 10 }}
            id="my-button"
            variant="contained"
            color="secondary"
            // onClick={}
            startIcon={<StopIcon />}
          >
            Stop Live Stream
          </Button>
          {/* <VideoCard
            src={footage}
            autoplay="true"
            width="700"
            height="520"
            thickness="thin"
            fadeInTime="2"
            fadeOutTime="2"
            PlayProps
          /> */}
        </Grid>
        <Grid
          item
          lg={4}
          style={{
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
            borderRadius: "7px",
          }}
        >
          <Button
            variant="contained"
            color="Primary"
            startIcon={<InfoIcon />}
            size="large"
            fullWidth
            style={{
              marginRight: 50,
              // fontWeight: "bold",
              // color: "white",
              textTransform: "none",
              // fontFamily: "'Lato', sans-serif",
            }}
          >
            The Mission Status
          </Button>

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
                    {/* <CircularProgress /> */}
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
            {/* <Typography align="right" className={classes.bold400} size="10px">
              {" "}
            
              Emergency Code : 200 Lock Malfunction{" "}
            </Typography> */}
          </Grid>
        </Grid>
        {/*<Grid item lg={12}>
    
          <div>
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
          </div>
        </Grid> */}
      </Grid>
    </Layout>
  );
}

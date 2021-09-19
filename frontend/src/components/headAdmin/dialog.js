import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TextField } from "@material-ui/core";
import { Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@material-ui/data-grid";
import { storage, firestore } from "../../firebase";
import { useState, } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [link, setLink] = useState();
  var storageRef = storage.ref();

  

  const { data, participants, trainingTimes, open, setOpen } = props;
  var starsRef = storageRef.child("training/"+data.companyID+"/"+data.id+".webm");
  async function getVideoLink() {
    try {
      const response = await starsRef.getDownloadURL();
      console.log(response);
      setLink(response);
    } catch (err) {
      console.log(err);
    }
  }
  getVideoLink();
  console.log(link)
  const num = [0, 1, 2, 3, 4];
  var status;
  const stage = [
    "Mission Initiated",
    "Reached Victim",
    "Rest-tube Dropped",
    "Lifeguard Reached",
    "Mission Completed",
  ];
  var trainingT = [msToTime(trainingTimes[0]),msToTime(trainingTimes[1]),msToTime(trainingTimes[2]),msToTime(trainingTimes[3]),msToTime(trainingTimes[4])];
  var times = [];
  const columns = [
    {
      field: "id",
      headerName: "Operation Stage",
      width: 220,
      headerAlign: "left",
    },
    {
      field: "time",
      headerName: "Timeline (H:M:S.ms)",
      width: 300,
      headerAlign: "left",
    },
  ];
  if (data.currentStage == 0) {
    status = "Not Initialized";
  } else if (data.currentStage >= 1 && data.currentStage <= 5) {
    status = "Training Session is ongoing ....";
  } else if (data.currentStage == 6) {
    status =
      "Training Completed , Uploading in progress : Do NOT turn off the drone";
  } else {
    status = "Training Completed  ";
  }
  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
  num.map((num) => times.push({ id: stage[num], time: trainingT[num] }));
  console.log(times);
  return (
    <Dialog
      style={{ marginBottom: "10px", marginTop: "30px" }}
      open={open}
      maxWidth={"xl"}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <strong>{data.title}</strong>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div>
                <div style={{ marginTop: "10px", marginLeft: "20px" }}>
                  <Grid container spacing={5} autoComplete="off">
                    <Grid item xs={2}>
                      <Typography
                        style={{ marginTop: "15px" }}
                        size="12px"
                        color="textSecondary"
                      >
                        <strong>Unique ID :</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        value={data.id}
                        name="title"
                        disabled={true}
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Grid>

                    <Grid item xs={2}>
                      <Typography
                        style={{ marginTop: "15px", marginLeft: "30px" }}
                        size="12px"
                        color="textSecondary"
                      >
                        <strong>Sea Condition:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        value={data.seaCondition}
                        name="sea"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        style={{ marginTop: "15px" }}
                        size="12px"
                        color="textSecondary"
                      >
                        <strong>Current Stage :</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        value={status}
                        name="cstatus"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        style={{ marginLeft: "220px" }}
                        size="12px"
                        color="textPrimary"
                      >
                        <strong>
                          To view the updated status Please refresh your browser
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        style={{ marginTop: "15px" }}
                        size="12px"
                        color="textSecondary"
                      >
                        <strong>Commenced Date-time:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        value={data.date}
                        id="date"
                        label="Training Day"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        value={data.startTime}
                        id="startTime"
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

                    <Grid item xs={3}>
                      <Typography size="12px" color="textSecondary">
                        <strong>Description:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        value={data.summary}
                        style={{ width: "80%" }}
                        name="msg"
                        multiline
                        rows={8}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        size="12px"
                        variant="h5"
                        color="textSecondary"
                      >
                        <strong>Participants :</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        style={{ marginTop: "15px", marginLeft: "30px" }}
                        size="12px"
                        color="textSecondary"
                      >
                        <strong>Mobile Handler: </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        value={participants.mobileHandelerName}
                        name="mobile"
                        variant="outlined"
                        style={{ width: "50%" }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        style={{ marginTop: "15px", marginLeft: "30px" }}
                        size="12px"
                        color="textSecondary"
                      >
                        <strong> Rescue lifeguard: </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        value={participants.swimmerName}
                        name="rescuer"
                        variant="outlined"
                        style={{ width: "50%" }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        style={{ marginTop: "15px", marginLeft: "30px" }}
                        size="12px"
                        color="textSecondary"
                      >
                        <strong> Handler: </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        value={participants.dronePilotName}
                        name="pilot"
                        variant="outlined"
                        style={{ width: "50%" }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        hidden={data.currentStage < 7}
                        size="12px"
                        variant="h6"
                        color="textSecondary"
                      >
                        <strong>Video Footage :</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography
                        hidden={data.currentStage < 7}
                        align="left"
                        size="12px"
                        style={{ marginTop: "5px" }}
                        color="blue"
                      >
                        <Button variant="contained"  onClick={()=> window.open(link, "_blank")}
                          color="primary">
                        Click here to access video footage
</Button>
                        
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        size="12px"
                        variant="h5"
                        color="textSecondary"
                      >
                        <strong>Performance Timeline:</strong>
                      </Typography>
                    </Grid>
                    <DataGrid
                      style={{ marginLeft: 30, marginRight: 780 }}
                      autoHeight
                      rows={times}
                      columns={columns}
                      pageSize={5}
                      onRowDoubleClick
                      disableSelectionOnClick
                    />
                  </Grid>
                </div>
              </div>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ marginRight: "20px" }}
          onClick={() => {
            setOpen(false);
          }}
          color="primary"
        >
          <strong>Close</strong>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Typography } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

export default function StatDialog(props) {
  const [times, setTimes] = useState([]);
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    //only if timeline data is defined
    if (props.data.timeline) {
      //preparing the dataset for plotting (getting time differences between each milestone)
      let tempDifference; //to store the difference between two values temporary
      let timesArray = []; //time differences will be stored in this array
      let arrayLength = props.data.timeline.length; //getting the length of timeline array
      for (let i = 0; i < arrayLength - 1; i++) {
        // console.log(myStringArray[i]);
        tempDifference =
          Math.abs(props.data.timeline[i + 1] - props.data.timeline[i]) /
          1000 /
          60; //calculating the difference

        timesArray.push(Math.round(tempDifference * 100) / 100); //pushing it to the array by rounding it to two decimals at the same time
      }
      setTimes(timesArray);
    }
  }, [props]);

  useEffect(() => {
    //only if endtime data is defined
    if (props.data.endTime) {
      let unix_timestamp = props.data.endTime;
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(unix_timestamp * 1000);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      setEndTime(formattedTime);
    }
  }, [props]);

  const testData = {
    labels: [
      "Time it took for the UAV to reach the victim",
      "Time it took to drop the Restube after reaching victim",
      "Time it took for the lifeguard to reach victim after the dropping",
      "Time it took for the lifegurad to pull the victim to the shore",
    ],

    datasets: [
      {
        label: "Time Durations",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: times,
      },
    ],
  };

  return (
    <div>
      <Dialog
        fullWidth="true"
        maxWidth="md"
        open={props.open}
        onClose={() => {
          props.setOpen(false);
        }}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">Mission Analytics</DialogTitle> */}
        <Button
          variant="contained"
          fullWidth
          color="primary"
          size="large"
          style={{
            // fontWeight: "bold",
            fontSize: "23px",
            color: "white",
            textTransform: "none",
          }}
        >
          Time spent on each mission phase in minutes
        </Button>
        <DialogContent>
          {/* <DialogContentText align="center">
            Time spent on each mission phase in minutes
          </DialogContentText> */}
          {/* <Typography variant="h5" align="center" color="initial">
            Time spent on each mission phase in minutes
          </Typography> */}
          <div>
            <Pie
              data={testData}
              options={{
                title: {
                  display: true,
                  text: "",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
          <br />
          <div>
            <Typography variant="h6" align="center" color="initial">
              The rescue operation was carried out from {props.data.startedTime}{" "}
              to {endTime} at {props.data.date}
            </Typography>
          </div>
          <Typography variant="subtitle2" align="center" color="initial">
            Please note that if a particular step is skipped during the mission,
            the duration will be zero for that step.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpen(false);
            }}
            autoFocus
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

export default function StatDialog(props) {
  const [times, setTimes] = useState([]);

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
        maxWidth="md"
        open={props.open}
        onClose={() => {
          props.setOpen(false);
        }}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Mission Analytics</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please note that if a particular step is skipped during the mission,
            the duration will be zero for that step.
          </DialogContentText>
          <div>
            <Pie
              data={testData}
              options={{
                title: {
                  display: true,
                  text: "Time spent on each mission phase",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpen(false);
            }}
            autoFocus
            color="primary"
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

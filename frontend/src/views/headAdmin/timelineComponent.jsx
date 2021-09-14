import React from "react";
import { useState, useEffect } from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
// import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import BackupIcon from "@material-ui/icons/Backup";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import PoolIcon from "@material-ui/icons/Pool";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
  timelineIcon: {
    fontSize: "large",
  },
  // timelineConnector: {
  //   height: "30px",
  // },
}));

export default function TimelineComponent(props) {
  const classes = useStyles();

  const [status, setStatus] = useState(3);

  return (
    <div>
      {" "}
      <Timeline align="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color={status >= 1 ? "primary" : "grey"}>
              <FlightTakeoffIcon className={classes.timelineIcon} />
            </TimelineDot>
            <TimelineConnector
              // className={classes.timelineConnector}
              style={{
                backgroundColor: `${status >= 1 ? "#039BE5" : "#BDBDBD"}`, //blue - #039BE5 , gray - #BDBDBD
                height: "30px",
              }}
            />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>Mission Initiated</Typography>
            {/* {status == 1 && (
        <LinearProgress style={{ marginRight: "56px" }} />
      )} */}
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color={status >= 1 ? "primary" : "grey"}>
              <FlightLandIcon className={classes.timelineIcon} />
            </TimelineDot>
            <TimelineConnector
              style={{
                backgroundColor: `${status >= 2 ? "#039BE5" : "#BDBDBD"}`, //blue - #039BE5 , gray - #BDBDBD
                height: "30px",
              }}
            />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>Reaching the Victim</Typography>
            {status == 1 && <LinearProgress style={{ marginLeft: "24px" }} />}
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color={status >= 2 ? "primary" : "grey"}>
              <ArrowDownwardIcon className={classes.timelineIcon} />
            </TimelineDot>
            <TimelineConnector
              style={{
                backgroundColor: `${status >= 3 ? "#039BE5" : "#BDBDBD"}`, //blue - #039BE5 , gray - #BDBDBD
                height: "30px",
              }}
            />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>Dropping the Restube</Typography>
            {status == 2 && <LinearProgress style={{ marginRight: "26px" }} />}
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color={status >= 3 ? "primary" : "grey"}>
              <PoolIcon className={classes.timelineIcon} />
            </TimelineDot>
            <TimelineConnector
              style={{
                backgroundColor: `${status >= 4 ? "#039BE5" : "#BDBDBD"}`, //blue - #039BE5 , gray - #BDBDBD
                height: "30px",
              }}
            />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>Lifeguard Reaching</Typography>
            {status == 3 && <LinearProgress style={{ marginLeft: "48px" }} />}
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color={status >= 4 ? "primary" : "grey"}>
              <ThumbUpIcon className={classes.timelineIcon} />
            </TimelineDot>
            <TimelineConnector
              style={{
                backgroundColor: `${status >= 5 ? "#039BE5" : "#BDBDBD"}`, //blue - #039BE5 , gray - #BDBDBD
                height: "30px",
              }}
            />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>Completing Rescue Misson</Typography>
            {status == 4 && <LinearProgress />}
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color={status >= 5 ? "primary" : "grey"}>
              <BackupIcon className={classes.timelineIcon} />
            </TimelineDot>
            <TimelineConnector
              style={{
                backgroundColor: `${status >= 7 ? "#039BE5" : "#BDBDBD"}`, //blue - #039BE5 , gray - #BDBDBD
                height: "30px",
              }}
            />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>Uploading the Recording</Typography>
            {(status == 6 || status == 5) && (
              <LinearProgress style={{ marginLeft: "18px" }} />
            )}
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color={status >= 7 ? "primary" : "grey"}>
              <CheckCircleIcon className={classes.timelineIcon} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Typography>Mission Completed</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

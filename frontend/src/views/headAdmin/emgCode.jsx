import React from "react";
import { useState, useEffect } from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

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
}));
function TransitionUp(props) {
  return <Slide {...props} direction="down" />;
}

export default function EmergencyComponent(props) {
  const classes = useStyles();
  const [code, setCode] = useState([]);
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    if (props.isMissionPresent == true) {
      //then we have a mission
      //if the mission is operation
      console.log(props.missionType);
      if (props.missionType === "operation") {
        const unsubscribe = props.database
          .collection("operations")
          .doc(props.missionId)
          .onSnapshot((doc) => {
            console.log("inside listner");
            setCode(doc.data().emergencyCode);
            setOpen(true);
          });

        return () => {
          unsubscribe();
        };
      } else if (props.missionType === "training") {
        //else it is a training operation
        const unsubscribe = props.database
          .collection("trainingOperations")
          .doc(props.missionId)
          .onSnapshot((doc) => {
            console.log("inside listner");
            setCode(doc.data().emergencyCode);
            setOpen(true);
          });

        return () => {
          unsubscribe();
        };
      }
    } else {
      setCode([]);
    }
  }, [props]);
  var num = 0;
  console.log("state", open);

  return (
    <div>
      {code.map((emergency) => (
        <Snackbar
          style={{ marginTop: num, marginLeft: 0 }}
          {...(num = num + 54)}
          open={props.open && code && open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          TransitionComponent={TransitionUp}
        >
          <Alert variant="filled" severity="error">
            {emergency}
          </Alert>
        </Snackbar>
      ))}
      <Snackbar
        style={{ marginTop: num }}
        open={props.open && code && open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionUp}
      >
        <Alert
          variant="filled"
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Close Alerts
        </Alert>
      </Snackbar>
    </div>
  );
}

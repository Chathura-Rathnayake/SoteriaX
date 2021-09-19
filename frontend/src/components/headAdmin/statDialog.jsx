import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";

export default function StatDialog(props) {
  //   useEffect(() => {
  //     // console.log("useeff");
  //     // console.log(props.data);
  //   }, [props.data]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          props.setOpen(false);
        }}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Mission Analytics"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.{" "}
            {props.data.missionId}
          </DialogContentText>
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

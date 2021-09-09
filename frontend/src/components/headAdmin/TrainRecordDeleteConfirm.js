import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useAuth } from "../../contexts/AuthContext.js";
export default function AlertDialog(props) {
  const { dataConfirm, openConfirm, setOpenConfirm } = props;
  const handleClose = () => {
    setOpenConfirm(false);
  };
  let uid;
  useAuth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      uid = idToken;
    });

  const deleteDoc = () => {
    const backendData = {
      token: uid,
      id: dataConfirm.id,
    };
    console.log(backendData);
    fetch("/DeleteScheduledTraining", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(backendData),
    })
      .then((res) => res.json())
      .then((respond) => {
        if (respond) {
          window.location.reload();
          // setNotify({
          //   isOpen: true,
          //   message:"Training Session Scheduled successfully",
          //   type: "success",
          //   num:80,

          // });
        }
      })
      .catch((error) => {});
    setOpenConfirm(false);
  };

  return (
    <Dialog
      open={openConfirm}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirm your action.."}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your are going to delete the training session "
          <strong>{dataConfirm.title}</strong> "
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          scheduled "<strong>{dataConfirm.date}</strong>" at "
          <strong>{dataConfirm.startTime}</strong>"
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <strong>Close</strong>
        </Button>
        <Button onClick={deleteDoc} color="secondary" autoFocus>
          <strong>Confirm</strong>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

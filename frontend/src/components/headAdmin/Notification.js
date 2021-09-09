import React from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  top: {
    top: theme.spacing(15),
  },
  bot: {
    top: theme.spacing(74),
  },
}));

function TransitionUp(props) {
  return <Slide {...props} direction="down" />;
}
export default function Notification(props) {
  const { notify, setNotify } = props;
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      style={{ marginTop: notify.num }}
      // className={notify.num == 1 ? classes.top : classes.bot}
      open={notify.isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={TransitionUp}
      onClose={handleClose}
    >
      <Alert variant="filled" severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

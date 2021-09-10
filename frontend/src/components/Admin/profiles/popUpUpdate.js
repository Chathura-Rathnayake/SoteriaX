import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import Create from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { useAuth } from "../../../contexts/AuthContext.js";
import HeadLGform from '../../../views/Admin/headLGform'


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {/* {onClose ? (
        // <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        //   <CloseIcon />
        // </IconButton>
      ) : null} */}
    </MuiDialogTitle>
  );
});


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedUpdate(props) {

  const {hlgID, companyName, name, userPhone, companyPhone, gender, companyEmail, supportType, birthday, userEmail, companyAddress, staticIP, piModel } = props;
  const [open, setOpen] = React.useState(false);

  const [checked, setChecked] = React.useState(true);

  const handleSelectChange = (event) => {
    setChecked(event.target.checked);
  };

  const { currentUser } = useAuth();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

// function FromdataTranfer(data) {
//   fetch("/viewHR", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((res) => res.json())
// }

// async function handleSubmit(e) {
//   e.preventDefault();
//   const idToken = await currentUser.getIdToken(true);
//   const { reply } = e.target.elements;
//   var formdata = {
//     reply: reply.value,
//     hrID: hrID,
//     token: idToken,
//   };
//   FromdataTranfer(formdata);
// }

  return (
    <div>
      <Button mini={true} variant="fab" zDepth={0} onClick={handleClickOpen}>
            <Create />
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <b>Head lifeguard ID :</b> {hlgID}
        </DialogTitle>
        {/* <form onSubmit={handleSubmit} autoComplete="off"> */}
        <DialogContent dividers>
         <HeadLGform/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus type="submit" onClick={handleClose} color="secondary">
            Update
          </Button>
        </DialogActions>
        {/* </form> */}
      </Dialog>
      
    </div>
  );
}


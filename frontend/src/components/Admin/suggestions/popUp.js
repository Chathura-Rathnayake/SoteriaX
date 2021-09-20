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
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { useAuth } from "../../../contexts/AuthContext.js";


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

export default function CustomizedDialogs(props) {

  const {suggestionID, name, accountType, headline, date, userID, msg, companyID } = props;
  const [open, setOpen] = React.useState(false);

  const [checked, setChecked] = React.useState(true);

  const handleSelectChange = (event) => {
    setChecked(event.target.checked);
  };

  const { currentUser } = useAuth();

  async function  updateView() {
    const idToken = await currentUser.getIdToken(true);
    var id = {suggestionID: suggestionID, token: idToken,}
    fetch("/updateSuggestions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(id),
    })
    .then((res) => res.json())
  }

  const handleClickOpen = () => {
    setOpen(true);
    updateView();
  };

  const handleClose = () => {
    setOpen(false);
  };

function FromdataTranfer(data) {
  console.log(data);
  fetch("/viewSuggestions", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
      .then((res) => res.json())
      .then((data) => console.log(data));
      {window.location.reload()}
}

async function handleSubmit(e) {
  e.preventDefault();
  const idToken = await currentUser.getIdToken(true); //get the token of the current user
  const { reply } = e.target.elements;
  var formdata = {
    reply: reply.value,
    suggestionID: suggestionID,
    token: idToken,
  };
  //console.log(formdata)
  FromdataTranfer(formdata);
}

  return (
    <div>
      <Button mini={true} variant="fab" zDepth={0} onClick={handleClickOpen}>
            <Visibility />
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <b>Reference ID :</b> {suggestionID}
        </DialogTitle>
        <form onSubmit={handleSubmit} autoComplete="off">
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>Name :</b> {name} 
          </Typography>
          <Typography gutterBottom>  
          <b>Account Type :</b> {accountType}
          </Typography>
          <Typography gutterBottom>   
          <b>Subject :</b> {headline}
          </Typography>
          <Typography gutterBottom>
          <b>Suggestion :</b> {msg}
          </Typography>
          <TextField 
          id="outlined-multiline-static"
          style ={{width: '100%'}}
          name = "reply"
          label="Reply"
          multiline
          rows={4}
          variant="outlined"
          />  
        </DialogContent>
        <DialogActions>
          {/* <Checkbox
            checked={checked}
            style={{alignItems: "left"}}
            onChange={handleSelectChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          /> */}
          <Button autoFocus type="submit" onClick={handleClose} color="secondary">
            Send Reply
          </Button>
        </DialogActions>
        </form>
      </Dialog>
      
    </div>
  );
}

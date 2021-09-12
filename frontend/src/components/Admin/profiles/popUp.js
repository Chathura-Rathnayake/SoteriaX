import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Grid from "@material-ui/core/Grid";
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

  const {hlgID, companyName, name, userPhone, companyPhone, gender, companyEmail, supportType, birthday, userEmail, companyAddress, staticIP, piModel } = props;
  const [open, setOpen] = React.useState(false);

  const [checked, setChecked] = React.useState(true);

  const handleSelectChange = (event) => {
    setChecked(event.target.checked);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button mini={true} variant="fab" zDepth={0} onClick={handleClickOpen}>
            <Visibility />
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <b>Head lifeguard ID :</b> {hlgID}
        </DialogTitle>
        <DialogContent dividers>
        <Grid container> 
          <Grid container item sm="6">
            <Typography gutterBottom variant="h6">
                <b>User Details </b>
              </Typography>
              <Typography gutterBottom>
                <b>Name :</b> {name} <br/> 
                <b>Gender :</b> {gender} <br/>  
                <b>Birthday :</b> {birthday} <br/> 
                <b>Email :</b> {userEmail} <br/>
                <b>Mobile Number :</b> {userPhone} <br/>
              </Typography>
          </Grid>
          <Grid container item sm="6">
            <Typography gutterBottom variant="h6">   
            <b>Company Details</b>
            </Typography>
            <Typography gutterBottom>
              <b>Name :</b> {companyName} <br/>
              <b>Address :</b> {companyAddress} <br/>
              <b>Email :</b> {companyEmail} <br/>
              <b>Contact Number :</b> {companyPhone} <br/>
            </Typography> 
          </Grid>
        </Grid>
        </DialogContent>

        <DialogContent dividers>
          <Typography gutterBottom variant="h6">
          <b>System Details</b>
          </Typography>
          <Typography gutterBottom>
          <b>Support Type :</b> {supportType} <br/>
          <b>Raspberry Pi Model :</b> {piModel} <br/>
          <b>Static IP Address :</b> {staticIP} <br/>
          </Typography>        
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}

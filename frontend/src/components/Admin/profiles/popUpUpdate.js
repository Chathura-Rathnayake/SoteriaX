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
import { Grid, } from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



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
  const {hlgID, firstName, lastName, companyName, name, userPhone, companyPhone, gender, companyEmail, supportType, birthday, userEmail, companyAddress, staticIP, piModel } = props;
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

  const initialFValues = {
    firstName: firstName,
    lastName: lastName,
    userEmail: userEmail,
    userPhone: userPhone,
    companyName: companyName,
    companyAddress: companyAddress,
    companyEmail: companyEmail,
    companyPhone: companyPhone,
    birthday: birthday,
    supportType: supportType,
    gender: gender,
    piModel: piModel,
    staticIP: staticIP
  }

  const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('userEmail' in fieldValues)
            temp.userEmail = (/$^|.+@.+..+/).test(fieldValues.userEmail) ? "" : "Email is not valid."
        if ('companyEmail' in fieldValues)
            temp.companyEmail = (/$^|.+@.+..+/).test(fieldValues.userEmail) ? "" : "Email is not valid."    
        if ('userPhone' in fieldValues)
            temp.userPhone = fieldValues.userPhone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('companyName' in fieldValues)
            temp.companyName = fieldValues.companyName ? "" : "This field is required."
        if ('companyAddress' in fieldValues)
            temp.companyAddress = fieldValues.companyAddress ? "" : "This field is required."
        if ('companyPhone' in fieldValues)
            temp.companyPhone = fieldValues.companyPhone.length > 9 ? "" : "Minimum 10 numbers required." 
        if ("birthday" in fieldValues) {
              //checking the age > 18
              let today = new Date();
              let birthDate = new Date(fieldValues.birthday);
              let age = today.getFullYear() - birthDate.getFullYear();
              let m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }
              //   console.log(age);
              if (fieldValues.birthday)
                temp.birthday =
                  age >= 18 ? "" : "Age must be greater than or equal to 18";
            }                  
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
    } = useForm(initialFValues, true, validate);


    const subscriptions = [
      { id: 'withSupport', title: 'With Support' },
      { id: 'withoutSupport', title: 'Without Support' },
    ]
    
    const genderItems =[
      {id: 'male', title: 'Male'},
      {id: 'female', title: 'Female'}
    ]

const [data, setData] = React.useState([]);
    
function FromdataTranfer(data) {
  fetch("/updateHLG", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => setData(data));
}


async function handleSubmit(e) {
  e.preventDefault();
  if (validate()){
    const idToken = await currentUser.getIdToken(true);
    const { firstName, lastName, userEmail, birthday, userPhone, gender, companyName, companyAddress, companyEmail, companyPhone, piModel, staticIP, supportType } = e.target.elements;
    var formdata = {
      firstName: firstName.value,
      lastName: lastName.value,
      userEmail: userEmail.value,
      birthday: birthday.value,
      userPhone: userPhone.value,
      gender: gender.value,
      companyName: companyName.value,
      companyAddress: companyAddress.value,
      companyEmail: companyEmail.value,
      companyPhone: companyPhone.value,
      piModel: piModel.value,
      staticIP: staticIP.value,
      supportType: supportType.value,
      hlgID: hlgID,
      token: idToken,
    };
    FromdataTranfer(formdata);
  } 
}

  const [open1, setOpen1] = React.useState(false);

  const handleClick1 = () => {
    setOpen1(true);
  };

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };




  return (
    <div>
      <Button mini={true} variant="fab" zDepth={0} onClick={handleClickOpen}>
            <Create />
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <b>Head lifeguard ID :</b> {hlgID}
        </DialogTitle>
        <Form onSubmit={handleSubmit} autoComplete="off">
        <DialogContent dividers>
          <Typography gutterBottom style={{marginBottom:'30px'}}>
            <b>User Details </b>
          </Typography>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Grid item lg={12}>
                <Controls.Input
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                />
                </Grid>
                <Grid item lg={12}>
                <Controls.Input style={{marginTop:'15px', marginBottom:'15px'}}
                    label="Email"
                    name="userEmail"
                    value={values.userEmail}
                    onChange={handleInputChange}
                    error={errors.userEmail}
                />
                </Grid>
                <Grid item lg={10}>
                <Controls.DatePicker style={{marginTop:'100px'}}
                    name="birthday"
                    label="Birthday"
                    value={values.birthday}
                    onChange={handleInputChange}
                    error={errors.birthday}
                />
                </Grid>
              </Grid>
              <Grid item xs={6}>  
                <Grid item lg={12}>
                <Controls.Input
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                />
                </Grid>
                <Grid item lg={12}>
                <Controls.Input style={{marginTop:'15px'}}
                    label="Contact number"
                    name="userPhone"
                    value={values.userPhone}
                    onChange={handleInputChange}
                    error={errors.userPhone}
                />
                </Grid>
                <Grid item lg={12} style={{marginTop:'15px'}}>
                <Controls.RadioGroup 
                    name="gender"
                    label="Gender"
                    value={values.gender}
                    onChange={handleInputChange}
                    items={genderItems}
                />
                </Grid>
              </Grid>  
            </Grid>
        </DialogContent>

        <DialogContent dividers>
          <Typography gutterBottom style={{marginBottom:'30px'}}>
              <b>Company Details </b>
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Grid item lg={12}>
                <Controls.Input
                    label="Company name"
                    name="companyName"
                    value={values.companyName}
                    onChange={handleInputChange}
                    error={errors.companyName}
                />
              </Grid>
              <Grid item lg={12}>
                <Controls.Input style={{marginTop:'15px'}}
                    label="Email address"
                    name="companyEmail"
                    value={values.companyEmail}
                    onChange={handleInputChange}
                    error={errors.companyEmail}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item lg={12}>
                <Controls.Input
                    label="Contact number"
                    name="companyPhone"
                    value={values.companyPhone}
                    onChange={handleInputChange}
                    error={errors.companyPhone}
                />
                </Grid>
            </Grid>   
          </Grid>
          <Grid container spacing={0}>
          <Grid item xs={12}>
            <Grid item lg={12}>
              <Controls.Input style={{marginTop:'15px', width:'100%'}}
                  label="Company address"
                  name="companyAddress"
                  value={values.companyAddress}
                  onChange={handleInputChange}
                  error={errors.companyAddress}
              />
            </Grid>
           </Grid> 
          </Grid>  
        </DialogContent>

        <DialogContent dividers>
          <Typography gutterBottom style={{marginBottom:'30px'}}>
              <b>System Details </b>
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Grid item lg={12}>
                <Controls.Input
                    label="Raspberry Pi Model"
                    name="piModel"
                    value={values.piModel}
                    onChange={handleInputChange}
                />
              </Grid>
              <Grid item lg={12}>
                <Controls.Input style={{marginTop:'15px'}}
                    label="Static IP"
                    name="staticIP"
                    value={values.staticIP}
                    onChange={handleInputChange}
                />
              </Grid>
            </Grid>
              <Grid item xs={6}>
                  <Grid item lg={12}>
                    <Controls.RadioGroup 
                        name="supportType"
                        label="Subscription Type"
                        value={values.supportType}
                        onChange={handleInputChange}
                        items={subscriptions}
                    />
                  </Grid>
              </Grid>  
          </Grid> 
        </DialogContent>   

        <DialogActions>
          <Button autoFocus type="submit" onClick={handleClick1} color="secondary">
            Update
          </Button>
          {console.log(data.flag)}
          { data.flag === 1 ? (
          <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="success">
              Updated Successfully!
            </Alert>
            {window.location.reload()}
          </Snackbar>
          ) : (
            <Snackbar open={open1} autoHideDuration={8000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="info">
              Data Validating... If the page is not automatically refreshed, Please check the above details again.
            </Alert>
          </Snackbar>
          )}
        </DialogActions>
        </Form>
      </Dialog>
      
    </div>
  );
}


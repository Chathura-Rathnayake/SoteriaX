import {React, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TextField } from "@material-ui/core";
import { Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@material-ui/data-grid";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Controls from "../Admin/controls/Controls";
// import { useForm, Form } from './formHandle';
import Select from "@material-ui/core/Select";
import { useAuth } from "../../contexts/AuthContext.js";
// import { useForm } from "react-hooks-helper";
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });

export default function AlertDialogSlide(props) {
const {open, setOpen,data } = props;
console.log("testing",typeof data !== "undefined");
const [firstname, setName] = useState(props.data.firstName);
console.log("popup:",data);
let uid;
var x;
useAuth()
  .currentUser.getIdToken(true)
  .then((idToken) => {
    uid = idToken
    var x = uid
    //console.log("orin 1", uid);
  });
//console.log("orin dsadada1", x);
// const [state, setState] = useState({
//     firstName: "",
//     email: "",

//   });
//   const initialFValues = {
//     firstName: "",
//     lastName: "lastName",
//     email: "userEmail",
//     // phone_number: userPhone,
//     // companyName: companyName,
//     // companyAddress: companyAddress,
//     // companyEmail: companyEmail,
//     // companyPhone: companyPhone,
//     // birthday: birthday,
//     // supportType: supportType,
//     // gender: gender,
//     // piModel: piModel,
//     // staticIP: staticIP
//   }
//   const {
//     values,
//     setValues,
//     errors,
//     setErrors,
//     handleInputChange,
// } = useForm(initialFValues);

//   const handleChange = evt => {
//     const name = evt.target.name;
//     const value =
//     evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
//     setState({
//       ...state,
//       [name]: value
//     })
//   }
//   const handleChange = e => {
//     const { name, value } = e.target
//     setState({
//         ...state,
//         [name]: value
//     })
// }

// const {
//     values,
//     setValues,
//     errors,
//     setErrors,
//     handleInputChange,
// } = useForm(initialFValues, true, validate);
  
//   num.map((num) => times.push({ id: stage[num], time: trainingTimes[num] }));
//   console.log(times);
const { currentUser } = useAuth();
function handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, NIC, birthdate, phone, certificate_level, isPilot,gender } = e.target.elements
    // var pilot;
    // if(isPilot.value=="true"){
    //   pilot=0
    // }
    var formdata = {
      firstName: fname.value,
      lastName: lname.value,
      NIC: NIC.value,
      phone_no: phone.value,
      email: email.value,
      birthDate: birthdate.value,
      certificateLevel: certificate_level.value,
      isPilot: Boolean(isPilot.value),
      gender: gender.value,
      token: uid,
      id: data.id,
      companyID: currentUser.uid,
    };
    //console.log(formdata);
    dataTransferToEdit(formdata);
  }

  function dataTransferToEdit(data) {
    fetch("/editLifeguard", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),

    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    console.log("done");
  }
  
//   const [formData, setForm] = useForm({
//     name: "",
//     lname: "",
//     NIC: "",
//     phone: "",
//     email: "",
//     birthdate: "",
//     certificate_level: "",
//     isPilot: "",
//     gender: "",
//   });

  return (
      

    <div> {typeof data !== "undefined" && (    <Dialog
        style={{ marginBottom: "10px", marginTop: "30px" }}
        open={open}
        maxWidth={"xl"}
        //TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <strong>Edit User</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <form onSubmit={handleSubmit} autoComplete="off">
              <div style={{ marginTop: '50px', marginLeft: '50px' }}>
  
                <div style={{ }}>
                  <Grid container spacing={5} autoComplete="off">
                    <Grid item xs={5} >
                      <TextField name="fname" id="fname"  defaultValue={data.firstName} label="First name" style={{ width: 300 }} />
                      {/* <Controls.Input
                      name="firstName"
                      label="First Name"
                      value={data.firstName}
                  /> */}
                      {/* <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue={data.firstName}
            helperText="Some important text"
            variant="outlined"
          /> */}
                    </Grid>
                    <Grid item xs={5}>
                      <TextField name="lname" defaultValue={data.lastName} label="Last name" style={{ width: 300 }} />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField name="email" defaultValue={data.email} id="email" label="Email" style={{ width: 300 }} />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField name="NIC" defaultValue={data.NIC} id="Id" label="NIC Number" style={{ width: 300 }} />
                    </Grid>
                    <Grid item xs={5} >
                      <TextField name="phone" defaultValue={data.phone_number} id="phone" label="Phone Number" style={{ width: 300 }} />
                    </Grid>
                    {/* <Grid item xs={5} >
                      <TextField name="certificate_level" id="certificate_level" label="Certificate Level" style={{ width: 300 }} />
                    </Grid> */}
                                        <Grid item xs={5} >
                      <TextField
                        required={true}
                        name="birthdate"
                        label="Birthday"
                        defaultValue={data.birthDate}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={5} >
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Is Pilot?</FormLabel>
                        <RadioGroup row aria-label="position" name="isPilot" defaultValue={String(data.isPilot)} >
                          <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="True"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio color="primary" />}
                            label="False"
                            labelPlacement="start"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    
                  <Grid item xs={5} >
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup row aria-label="position" name="gender" defaultValue={data.gender}>
                        <FormControlLabel
                          value="male"
                          control={<Radio color="primary" />}
                          label="Male"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio color="primary" />}
                          label="Female"
                          labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5} >
                    {/* <TextField name="certificate_level" id="certificate_level" label="Certificate Level" style={{ width: 300 }} /> */}

               

                      <Typography size="12px" color="textSecondary">
                        Certificate Level:
                      </Typography>

                    <Select
                        name="certificate_level"
                        native
                        label="Certificate Level"
                        style={{ width: "60%" }}
                        defaultValue={data.certificateLevel}
                        inputProps={{
                          name: "certificate_level",
                          id: "filled-age-native-simple",
                        }}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Master">Master</option>
                      </Select>
              
                  </Grid>


                    {/* <Grid item xs={12}>
                      <TextField id="standard-secondary" label="Username" style={{ width: 300 }} />
                    </Grid> */}
                  </Grid>
                  <div style={{ marginTop: '50px', marginLeft: '50px' }}>
                    <Button
                      type="submit" value="Submit"
                      variant="contained"
                      color="primary"
                      size="medium"
                      style={{ marginLeft: 485 }}
                      onClick={() => {
                            console.log("popupclicked");
                      }}
                    >
                      Create Lifeguard
                    </Button>
                  </div>
  
                </div>
  
              </div>
  
            </form>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button
            style={{ marginRight: "20px" }}
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
          >
            <strong>Close</strong>
          </Button>
        </DialogActions> */}
      </Dialog>)} </div>

);
{/* <div>
    <p>adsaasdasd</p>
</div> */}

}

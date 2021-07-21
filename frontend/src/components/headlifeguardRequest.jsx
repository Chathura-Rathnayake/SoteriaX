import React, { useRef, useState } from "react";
import "../assets/css/headlifeguardRequest.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Paper, Button, Container } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Link, useHistory } from "react-router-dom";
import { firestore } from "../firebase";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useFormControls } from "./useFormControls";

const useStyles = makeStyles((theme) => ({
  bgImage: {
    opacity: 0.4,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "auto",
  },  
  mainDiv: {
    position: "relative",
    //opacity:"1 !important",
    boarder: "20%",
    backgroundColor: "white",
    borderRadius: "10px",
  },
}));

export default function HeadlifeguardRequest() {
  const { handleInputValue, formIsValid, errors } =
    useFormControls();

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const userEmailRef = useRef();
  const userPhoneRef = useRef();
  const birthdayRef = useRef();
  const companyNameRef = useRef();
  const companyEmailRef = useRef();
  const companyAddressRef = useRef();
  const companyPhoneRef = useRef();

  const classes = useStyles();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState();
  const [supportType, setSupportType] = useState();

  const history = useHistory();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    handleInputValue(event);
  };

  const handleSupportTypeChange = (event) => {
    setSupportType(event.target.value);
    handleInputValue(event);
  };

  async function handleRequest(e) {
    e.preventDefault();
    console.log(gender);
    //send a doc with a generated id.
    firestore
      .collection("userRequests")
      .add({
        firstName: firstnameRef.current.value,
        lastName: lastnameRef.current.value,
        userEmail: userEmailRef.current.value,
        userPhone: userPhoneRef.current.value,
        birthday: birthdayRef.current.value,
        gender: gender, //the RHS one is state variable gender
        companyName: companyNameRef.current.value,
        companyEmail: companyEmailRef.current.value,
        companyAddress: companyAddressRef.current.value,
        companyPhone: companyPhoneRef.current.value,
        supportType: supportType, //the RHS one is state variable gender
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        history.push("/");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  const inputFieldValue = [
    {
      name: "firstName",
      label: "First Name",
      id: "firstName",
      index: 1,
    },
    {
      name: "userEmail",
      label: "User Email",
      id: "userEmail",
      index: 2,
    },
    {
      name: "lastName",
      label: "Last Name",
      id: "lastName",
      index: 3,
    },
    {
      name: "userPhone",
      label: "User Phone",
      id: "userPhone",
      index: 4,
    },
    {
      name: "companyName",
      label: "Company Name",
      id: "companyName",
      index: 5,
    },
    {
      name: "companyEmail",
      label: "Company Email",
      id: "companyEmail",
      index: 6,
    },
    {
      name: "companyAddress",
      label: "Company Address",
      id: "companyAddress",
      index: 7,
    },
    {
      name: "companyPhone",
      label: "Company Phone",
      id: "companyPhone",
      index: 8,
    },
    {
      name: "gender",
      label: "Gender",
      id: "gender",
      index: 9,
    },
    {
      name: "supportType",
      label: "The Subscription Type",
      id: "supportType",
      index: 10,
    },
    {
      name: "birthday",
      label: "Birthday",
      id: "birthday",
      index: 11,
    },
  ];

  return (
    <div>
            <img
        className={classes.bgImage}
        src="https://images.unsplash.com/photo-1611222566295-885a2c99153a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        alt=""
      ></img>
      <div>
        <Container maxWidth="lg" className={classes.mainDiv} >
          <Paper
            style={{
              padding: 40,
              margin: 50,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              style={{
                fontWeight: "bold",
                color: "#3b3c3d",
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              SoteriaX Account Request Form
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              style={{
                color: "#5e5e5e",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Please fill the following form with your information. A SoteriaX
              agent will contact you to proceed with the registration.
            </Typography>{" "}
            <br></br>
            <Grid container spacing={3}>
              <Grid container item sm="6" spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontWeight: "bold",
                      color: "#056f8c",
                    }}
                  >
                    Your information
                  </Typography>
                </Grid>
                <Grid item sm="6">
                  <TextField
                    inputRef={firstnameRef}
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    key={inputFieldValue[0].index}
                    onChange={handleInputValue}
                    onBlur={handleInputValue}
                    name={inputFieldValue[0].name}
                    label={inputFieldValue[0].label}
                    error={errors[inputFieldValue[0].name]}
                    multiline={inputFieldValue[0].multiline ?? false}
                    rows={inputFieldValue[0].rows ?? 1}
                    autoComplete="none"
                    {...(errors[inputFieldValue[0].name] && {
                      error: true,
                      helperText: errors[inputFieldValue[0].name],
                    })}
                  />
                </Grid>
                <Grid item sm="6">
                  <TextField
                    inputRef={lastnameRef}
                    variant="outlined"
                    required
                    id="lastName"
                    fullWidth
                    size="small"
                    key={inputFieldValue[2].index}
                    onChange={handleInputValue}
                    onBlur={handleInputValue}
                    name={inputFieldValue[2].name}
                    label={inputFieldValue[2].label}
                    error={errors[inputFieldValue[2].name]}
                    multiline={inputFieldValue[2].multiline ?? false}
                    rows={inputFieldValue[2].rows ?? 1}
                    autoComplete="none"
                    {...(errors[inputFieldValue[2].name] && {
                      error: true,
                      helperText: errors[inputFieldValue[2].name],
                    })}
                  />
                </Grid>
                <Grid item sm="6">
                  {" "}
                  <TextField
                    inputRef={userEmailRef}
                    variant="outlined"
                    required
                    id="email"
                    fullWidth
                    size="small"
                    key={inputFieldValue[1].index}
                    onChange={handleInputValue}
                    onBlur={handleInputValue}
                    name={inputFieldValue[1].name}
                    label={inputFieldValue[1].label}
                    error={errors[inputFieldValue[1].name]}
                    multiline={inputFieldValue[1].multiline ?? false}
                    rows={inputFieldValue[1].rows ?? 1}
                    autoComplete="none"
                    {...(errors[inputFieldValue[1].name] && {
                      error: true,
                      helperText: errors[inputFieldValue[1].name],
                    })}
                  />
                </Grid>
                <Grid item sm="6">
                  {" "}
                  <TextField
                    inputRef={userPhoneRef}
                    variant="outlined"
                    required
                    id="phone"
                    fullWidth
                    size="small"
                    key={inputFieldValue[3].index}
                    onChange={handleInputValue}
                    onBlur={handleInputValue}
                    name={inputFieldValue[3].name}
                    label={inputFieldValue[3].label}
                    error={errors[inputFieldValue[3].name]}
                    multiline={inputFieldValue[3].multiline ?? false}
                    rows={inputFieldValue[3].rows ?? 1}
                    autoComplete="none"
                    {...(errors[inputFieldValue[3].name] && {
                      error: true,
                      helperText: errors[inputFieldValue[3].name],
                    })}
                  />
                </Grid>
                <Grid item sm="6">
                  {" "}
                  <TextField
                    inputRef={birthdayRef}
                    id="date"
                    label="Birthday"
                    type="date"
                    size="small"
                    // defaultValue="1997-05-02"
                    name="birthday"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleInputValue}
                    error={errors[inputFieldValue[10].name]}
                    helperText={errors[inputFieldValue[10].name]}
                  />
                </Grid>
                <Grid item sm="6">
                  {" "}
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    row
                    onChange={handleGenderChange}
                    name="gender"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item sm="6"></Grid>
              </Grid>

              <Divider orientation="vertical" flexItem variant="middle" />

              <Grid container item spacing={3} item sm="6">
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontWeight: "bold",
                      color: "#056f8c",
                    }}
                  >
                    The Company information
                  </Typography>
                </Grid>
                <Grid item sm="6">
                  {" "}
                  <TextField
                    inputRef={companyNameRef}
                    variant="outlined"
                    required
                    id="companyName"
                    fullWidth
                    size="small"
                    key={inputFieldValue[4].index}
                    onChange={handleInputValue}
                    onBlur={handleInputValue}
                    name={inputFieldValue[4].name}
                    label={inputFieldValue[4].label}
                    error={errors[inputFieldValue[4].name]}
                    multiline={inputFieldValue[4].multiline ?? false}
                    rows={inputFieldValue[4].rows ?? 1}
                    autoComplete="none"
                    {...(errors[inputFieldValue[4].name] && {
                      error: true,
                      helperText: errors[inputFieldValue[4].name],
                    })}
                  />
                </Grid>
                <Grid item sm="6">
                  {" "}
                  <TextField
                    inputRef={companyEmailRef}
                    variant="outlined"
                    required
                    id="companyEmail"
                    fullWidth
                    size="small"
                    key={inputFieldValue[5].index}
                    onChange={handleInputValue}
                    onBlur={handleInputValue}
                    name={inputFieldValue[5].name}
                    label={inputFieldValue[5].label}
                    error={errors[inputFieldValue[5].name]}
                    multiline={inputFieldValue[5].multiline ?? false}
                    rows={inputFieldValue[5].rows ?? 1}
                    autoComplete="none"
                    {...(errors[inputFieldValue[5].name] && {
                      error: true,
                      helperText: errors[inputFieldValue[5].name],
                    })}
                  />
                </Grid>
                <Grid item sm="12">
                  {" "}
                  <TextField
                    inputRef={companyAddressRef}
                    variant="outlined"
                    required
                    id="companyAddress"
                    fullWidth
                    size="small"
                    key={inputFieldValue[6].index}
                    onChange={handleInputValue}
                    onBlur={handleInputValue}
                    name={inputFieldValue[6].name}
                    label={inputFieldValue[6].label}
                    error={errors[inputFieldValue[6].name]}
                    multiline={inputFieldValue[6].multiline ?? false}
                    rows={inputFieldValue[6].rows ?? 1}
                    autoComplete="none"
                    {...(errors[inputFieldValue[6].name] && {
                      error: true,
                      helperText: errors[inputFieldValue[6].name],
                    })}
                  />
                </Grid>
                <Grid item sm="6">
                  {" "}
                  <TextField
                    inputRef={companyPhoneRef}
                    variant="outlined"
                    required
                    id="companyPhone"
                    fullWidth
                    size="small"
                    key={inputFieldValue[7].index}
                    onChange={handleInputValue}
                    onBlur={handleInputValue}
                    name={inputFieldValue[7].name}
                    label={inputFieldValue[7].label}
                    error={errors[inputFieldValue[7].name]}
                    multiline={inputFieldValue[7].multiline ?? false}
                    rows={inputFieldValue[7].rows ?? 1}
                    autoComplete="none"
                    {...(errors[inputFieldValue[7].name] && {
                      error: true,
                      helperText: errors[inputFieldValue[7].name],
                    })}
                  />
                </Grid>
                <Grid item sm="6">
                  <FormLabel component="legend">
                    The Subscription Type
                  </FormLabel>
                  <RadioGroup
                    aria-label="subscription"
                    name="supportType"
                    row
                    key={inputFieldValue[9].index}
                    onChange={handleSupportTypeChange}
                  >
                    <FormControlLabel
                      value="withSupport"
                      control={<Radio />}
                      label="With Support"
                    />
                    <FormControlLabel
                      value="withoutSupport"
                      control={<Radio />}
                      label="Without Support"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item sm="12">
                  <div display="block" align="right">
                    {" "}
                    <Button
                      disabled={loading}
                      size="large"
                      href="/"
                      style={{
                        marginRight: 20,
                        fontWeight: "bold",
                        width: 130,
                      }}
                      variant="outlined"
                      color="primary"
                      //style={{backgroundColor: '#fa931d', color: '#FFFFFF'}}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleRequest}
                      size="large"
                      variant="contained"
                      color="primary"
                      style={{
                        fontWeight: "bold",
                        textTransform: "none",
                        width: 130,
                      }}
                      disabled={!formIsValid()}
                    >
                      Submit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

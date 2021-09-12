import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button'
import Layout from '../../components/headAdmin/Layout';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext.js";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { deleteUser } from "../../firebase";
import AlertDialogSlide from "../../components/headAdmin/edit_lifeguard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}
function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}












const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    backgroundColor: theme.palette.background.paper,
  },
  bigIndicator: {
    height: 6,
  },
}));

export default function Members() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false);

  const handleClickEdit = (e, cellValues) => {
    //console.log("cell val", cellValues);
    setOpen(true);
    // setPassingData(cellValues.row);
    // setPassingDataParticipants(cellValues.row.participants);
    // setPassingTrainingTimes(cellValues.row.trainingTimes);
  };

  const renderDetailsButtonEdit = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={(e) => {
            handleClickEdit(e,params);
          }}
        >
          Edit Details
        </Button>
      </strong>
    )
  }

  const columns = [

    {
      field: 'id',
      headerName: 'Employee-ID',
      width: 170,
      headerAlign: 'center',
    },
    // {
    //   field: 'username',
    //   headerName: 'Username',
    //   width: 150,
    //   headerAlign: 'center',
    // },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      headerAlign: 'center',
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      headerAlign: 'center',
    },
    {
      field: 'birthdate',
      headerName: 'Birthdate',
      type: 'number',
      width: 110,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      renderCell: renderDetailsButtonEdit,
      disableClickEventBubbling: true,
      width: 200,
      align: 'center',
      headerAlign: 'center',

    },
    {
      field: 'Delete',
      headerName: 'Delete',
      renderCell: renderDetailsButtonDelete,
      disableClickEventBubbling: true,
      width: 200,
      align: 'center',
      headerAlign: 'center',

    },
  ];

  function renderDetailsButtonDelete(params) {
    return (
      <strong>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={(e) => {
            handleClick(e, params);
            IdTransferToDelete(rowId);
          }}
        >
          Delete
        </Button>
      </strong>
    )
  }

  let uid;
  var x;
  useAuth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      uid = idToken
      var x = uid
      console.log("orin 1", uid);
    });
  console.log("orin dsadada1", x);

  function FromdataTranfer(data) {
    fetch("/addLifeguard", {
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

  function IdTransferToDelete(data) {
    fetch("/deleteLifeguard", {
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

  var rowId;

  const handleClick = (e, cellValues) => {
    rowId = { id: cellValues.row.id, token: uid };
    console.log('cell val', rowId);

    // deleteUser(rowId).then(() => {
    //   console.log("deleted from auth");
    // }).catch((error) => {
    //   console.log("error deleting from auth");
    //   // ...
    // });

  };

  const { signup } = useAuth();
  const { currentUser } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, NIC, birthdate, phone, certificate_level, isPilot } = e.target.elements
    var formdata = {
      firstName: fname.value,
      lastName: lname.value,
      NIC: NIC.value,
      phone_no: phone.value,
      email: email.value,
      birthdate: birthdate.value,
      token: uid,
      certificateLevel: certificate_level.value,
      isPilot: isPilot.value

    };
    //FromdataTranfer(formdata);
    addlifeguard(formdata);
  }

  const addlifeguard = (request) => {
    try {
      //   setError("");
      //   setLoading(true);

      //removing the id from the request - cuz we don't want it to get saved in the head lifeguard document

      var requestToSave = Object.assign({}, request);
      //delete requestToSave.id;

      const password = `${request.firstName.toUpperCase()}${request.phone_no}`;

      //after signup get the uid of the created account and..
      signup(request.email, password).then((uid) => {
        //storing the data in headlifeguard collection
        firestore
          .collection("lifeguards")
          .doc(uid) //creating a lifeguard document by setting the uid as its document id
          .set({
            //id: docRef.id,
            firstName: request.firstName,
            lastName: request.lastName,
            companyID: currentUser.uid,
            id: uid,
            birthdate: request.birthdate,
            NIC: request.NIC,
            phone_number: request.phone_no,
            email: request.email,
            isPilot: request.isPilot,
            certificateLevel: request.certificateLevel,
          }) //saving the request to headlifeguard collection
          .then((res) => {
            alert("The Lifeguard added Successfully");
          });

        //finally deleting the document from user request list
        // firestore
        //   .collection("userRequests")
        //   .doc(request.id)
        //   .delete()
        //   .then((res) => {
        //     console.log("Deleted!", res);
        //   });
      });

      console.log("addLifeguard");

      //if successful send an email with the password
      //call to the backend
    } catch {
      //   setError("Failed to create an account");
    }
  };

  const [data1, setData1] = useState([]);
  // useEffect(() => {
  //   fetch("/getLifeguards")
  //     .then((res) => res.json())
  //     .then((data1) => setData1(data1));

  // }, []);
  useEffect(() => {
    async function getUserList() {
      const idToken = await currentUser.getIdToken(true); //get the token of the current user
      const toSend = {
        token: idToken,
      };

      try {
        fetch("/trainingView", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend),
        })
          .then((res) => res.json()) //retrieving the request from backend
          .then((data1) => setData1(data1)); //printing it to the console

      } catch (err) {
        //
      }
    }
    getUserList(); //executing it
  }, []);

  // data1.filter(function(element){
  //   var cID=element.companyID;
  //   var hid= currentUser.uid;
  //   if(cID == hid){
  //     delete data1.element;
  //   }
  // });

  console.log(data1);

  return (
    <Layout>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            classes={{ indicator: classes.bigIndicator }}
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            color="primary"
          >
            <LinkTab label="Registered Lifeguards" {...a11yProps(0)} />
            <LinkTab label="Add new Lifeguard" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>

          {/* Content for first column */}
          <div style={{ height: '400px', width: '100%' }}>
            <DataGrid
              autoHeight
              rows={data1}
              columns={columns}
              pageSize={6}
              onRowDoubleClick
              disableSelectionOnClick
            />
          </div>

        </TabPanel>
        <TabPanel value={value} index={1}>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <div style={{ marginTop: '50px', marginLeft: '50px' }}>

              Please note that the default password will be allocated as the first time password.
              <div style={{ marginTop: '50px', marginLeft: '50px' }}>
                <Grid container spacing={5} autoComplete="off">
                  <Grid item xs={5} >
                    <TextField name="fname" label="First name" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField name="lname" label="Last name" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField name="email" id="email" label="Email" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField name="NIC" id="Id" label="NIC Number" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5} >
                    <TextField name="phone" id="phone" label="Phone Number" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5} >
                    <TextField name="certificate_level" id="certificate_level" label="Certificate Level" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5} >
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Is Pilot?</FormLabel>
                      <RadioGroup row aria-label="position" name="isPilot" >
                        <FormControlLabel
                          value={true}
                          control={<Radio color="primary" />}
                          label="True"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio color="primary" />}
                          label="False"
                          labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5} >
                    <TextField
                      required={true}
                      name="birthdate"
                      label="Birthday"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
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

                    }}
                  >
                    Create Lifeguard
                  </Button>
                </div>
              </div>

            </div>

          </form>
        </TabPanel>

      </div>
      <AlertDialogSlide
          // data={passingData}
          // participants={passingDataParticipants}
          // trainingTimes={passingDataTrainingTimes}
          open={open}
          setOpen={setOpen}
        ></AlertDialogSlide>
    </Layout>
  );
}

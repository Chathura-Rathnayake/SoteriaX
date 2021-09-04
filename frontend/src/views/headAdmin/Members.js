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

const renderDetailsButton = (params) => {
  return (
    <strong>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => {
          //Edit details
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
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    align: 'left',
    headerAlign: 'center',
  },
  {
    field: 'Edit',
    headerName: 'Edit',
    renderCell: renderDetailsButton,
    disableClickEventBubbling: true,
    width: 200,
    align: 'center',
    headerAlign: 'center',

  },
];




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

  let uid;
  var x;
   useAuth()
  .currentUser.getIdToken(true)
  .then((idToken) => {
   uid = idToken
   var x= uid
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

  function handleSubmit(e) {
    e.preventDefault();
    const {fname,lname,email,NIC,age,phone} = e.target.elements
    var formdata = {
      firstName:fname.value,
      lastName:lname.value,
      NIC:NIC.value,
      phone_no: phone.value,
      email: email.value,
      age: age.value,
      token: uid
      
    };  
    //FromdataTranfer(formdata);
    addlifeguard(formdata);
  }
  const { signup } = useAuth();
  const { currentUser } = useAuth();
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
        .collection("lifeguard")
        .doc(uid) //creating a lifeguard document by setting the uid as its document id
        .set({
          //id: docRef.id,
          firstName: request.firstName,
          lastName: request.lastName,
          companyID: currentUser.uid,
          id: uid,
          age: request.age,
          NIC: request.NIC,
          phone_number: request.phone_no,
          email: request.email,
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
  useEffect(() => {
    fetch("/getLifeguards")
      .then((res) => res.json())
      .then((data1) => setData1(data1));

  }, []);
  // console.log(data1);
  // data1.forEach(element => {
  //   // delete element.NIC;
  //   // delete element.accountStatus;
  //   // delete element.birthday;
  //   // delete element.certificationLevel;
  //   // delete element.contactNum;
  //   // delete element.email;
  //   // delete element.isPilot;
  //   // delete element.noOfOperations;
  //   console.log(element);  
  // });

  const rows = [
    // { id: 'EMP-LG-032', username: 'RonPerera', lastName: 'Perera', firstName: 'Ron', age: 35 },
    // { id: 'EMP-LG-021', username: 'AmilaS', lastName: 'Silva', firstName: 'Amila', age: 45 },
    // { id: 'EMP-LG-082', username: 'GunaKamal', lastName: 'Gunarathne', firstName: 'Kamal', age: 51 },
    // { id: 'EMP-LG-011', username: 'Susantha84', lastName: 'Desilva', firstName: 'Susantha', age: 46 },
    // { id: 'EMP-LG-014', username: 'kapilaWili', lastName: 'Wimalarathne', firstName: 'Kapila', age: 37 },
    // { id: 'EMP-LG-005', username: 'ThusharaSW', lastName: 'Wickrama', firstName: 'Thushara', age: 29 },
    // { id: 'EMP-LG-010', username: 'Haritha13', lastName: 'Peris', firstName: 'Harith', age: 43 },
    // {data1['0']}
    // array.forEach(element => {
    //   { id: element.id, username: 'Haritha13'},
    // });

  ];
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
                  <Grid item xs={5} >
                    <TextField name="age" id="age" label="Age" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField name="NIC" id="Id" label="NIC Number" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5} >
                    <TextField name="phone" id="phone" label="Phone Number" style={{ width: 300 }} />
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
    </Layout>
  );
}

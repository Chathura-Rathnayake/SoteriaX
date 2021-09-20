import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { firestore } from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
// import Visibility from "@material-ui/icons/Visibility";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Delete from "@material-ui/icons/Delete";
// import red from "@material-ui/core/colors/red";

//Shanuka
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
//------------------------

const columns = [
  { id: "firstName", label: "First\u00a0Name", minWidth: 80 },
  { id: "lastName", label: "Last\u00a0Name", minWidth: 80 },
  {
    id: "userEmail",
    label: "User\u00a0Email",
    minWidth: 80,
  },
  {
    id: "userPhone",
    label: "User\u00a0Phone",
    minWidth: 80,
  },
  {
    id: "companyName",
    label: "Company\u00a0Name",
    minWidth: 80,
  },
  {
    id: "companyEmail",
    label: "Company\u00a0Email",
    minWidth: 80,
  },
  {
    id: "companyPhone",
    label: "Company\u00a0Phone",
    minWidth: 80,
  },
  // {
  //   id: "view",
  //   label: "View",
  //   minWidth: 80,
  // },
  {
    id: "approve",
    label: "Approve",
    minWidth: 80,
  },
  {
    id: "remove",
    label: "Remove",
    minWidth: 80,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

//Shanuka
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//-----------------------

export default function RequestList() {
  //front end page rendering related data
  const [requests, setRequests] = useState([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //sign up related data
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    firestore.collection("userRequests").onSnapshot((snapshot) => {
      console.log("Firebase Snap!");
      setRequests(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            userEmail: doc.data().userEmail,
            userPhone: doc.data().userPhone,
            companyName: doc.data().companyName,
            companyEmail: doc.data().companyEmail,
            companyPhone: doc.data().companyPhone,
            supportType: doc.data().supportType,
            birthday: doc.data().birthday,
            gender: doc.data().gender,
            companyAddress: doc.data().companyAddress,
            piLastOnlineTime: doc.data().piLastOnlineTime,
          };
        })
      );
    });
  }, []);
  const deleteUserRequest = (id) => {
    firestore
      .collection("userRequests")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

  async function handleSubmit(e) {}

  const approveUserRequest = (request) => {
    try {
      //removing the id from the request - cuz we don't want it to get saved in the head lifeguard document
      var requestToSave = Object.assign({}, request);
      delete requestToSave.id;

      const password = `${request.firstName.toUpperCase()}${request.userPhone}`;

      //after signup get the uid of the created account and..
      signup(request.userEmail, password)
        .then((uid) => {
          //storing the data in headlifeguard collection
          firestore
            .collection("headLifeguards")
            .doc(uid) //creating a lifeguard document by setting the uid as its document id
            .set(requestToSave) //saving the request to headlifeguard collection
            .then((res) => {
              alert("The Account Approved Successfully! Please Enter the system details for this account.");
            });

          //finally deleting the document from user request list
          firestore
            .collection("userRequests")
            .doc(request.id)
            .delete()
            .then((res) => {
              console.log("Deleted!", res);
            });
          //send an email to reset the password
          currentUser
            .getIdToken(true) //getting the currently logged in user's id token from firebase (the admin actually)
            .then((idToken) => {
              //the complete object that is needed to sent to the backend
              const toSend = {
                headlifeguardUID: uid, //the uid of the headlifeguard we want to register
                token: idToken, //the token
              };

              // Send the data to the backend
              fetch("/createResetToken", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(toSend),
              });
              //.then((res) => res.json()) //retrieving the request from backend
              //.then((data) => console.log(data)); //printing it to the console
            })
            .catch(function (error) {
              // Handle the error
              console.log(error);
            });
        })
        .catch(function (err) {
          console.log("error: ", err.message);
          alert("Account Approval Failed: " + err.message);
        });
    } catch (err) {
      console.log(err);
      //   setError("Failed to create an account");
    }
  };

  //Shanuka
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  //----------------------------

  return (
    <div>
      <Typography variant="h5" color="initial">
        Pending User Requests
      </Typography>
      <br></br>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {requests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((request) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={request.id}
                    >
                      {columns.map((column) => {
                        const value = request[column.id];
                        return (
                          <TableCell key={column.id}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                            {column.id === "approve" && (
                              <>
                              <Button
                                mini={true}
                                variant="fab"
                                zDepth={0}
                                onClick={handleClickOpen}
                              >
                                <ThumbUp />
                              </Button>
                              <Dialog
                              open={open}
                              TransitionComponent={Transition}
                              keepMounted
                              onClose={handleClose}
                              aria-describedby="alert-dialog-slide-description"
                            >
                              <DialogTitle>{"Approve Confirmation!"}</DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                  Are you sure you want to approve this registration record?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={() => approveUserRequest(request)} color="secondary">Yes</Button>
                                <Button onClick={handleClose} color="secondary">No</Button>
                              </DialogActions>
                            </Dialog>
                            </>
                            )}
                            {column.id === "remove" && (
                            <>  
                              <Button
                                mini={true}
                                variant="fab"
                                onClick={handleClickOpen1}
                              >
                                <Delete style={{ color: "red" }} />
                              </Button>
                              <Dialog
                                open={open1}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose1}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>{"Delete Confirmation!"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-slide-description">
                                    Are you sure you want to delete this registration record?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={() => deleteUserRequest(request["id"])} color="secondary">Yes</Button>
                                  <Button onClick={handleClose1} color="secondary">No</Button>
                                </DialogActions>
                              </Dialog>
                              </>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
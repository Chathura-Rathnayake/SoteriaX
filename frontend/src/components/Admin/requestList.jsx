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
  {
    id: "view",
    label: "View",
    minWidth: 80,
  },
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

export default function RequestList() {
  //front end page rendering related data
  const [requests, setRequests] = useState([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //sign up related data
  const { signup } = useAuth();
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
    //storing the data in headlifeguard collection
    firestore
      .collection("headLifeguards")
      .doc(request.id)
      .set(request)
      .then((res) => {
        console.log("Added!", res);
        alert("The Account Approved Successfully");
      });
    //creating an account for the user
    // e.preventDefault()

    try {
      //   setError("");
      //   setLoading(true);
      const password = `${request.firstName.toUpperCase()}${request.userPhone}`;
      console.log(password);
      signup(request.userEmail, password);
      //if success send an email with the password
    } catch {
      //   setError("Failed to create an account");
    }

    // setLoading(false);
    //finally deleting the document
    firestore
      .collection("userRequests")
      .doc(request.id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

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
                            {column.id === "view" && (
                              <Button variant="contained" color="primary">
                                view
                              </Button>
                            )}
                            {column.id === "approve" && (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => approveUserRequest(request)}
                              >
                                approve
                              </Button>
                            )}
                            {column.id === "remove" && (
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => deleteUserRequest(request["id"])}
                              >
                                remove
                              </Button>
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

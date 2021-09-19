import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Layout from "../../components/headAdmin/Layout";
import { firestore } from "../../firebase";
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
import ThumbUp from "@material-ui/icons/ThumbUp";
import Delete from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "missionId", label: "Mission\u00a0ID", minWidth: 80 },
  { id: "date", label: "Date", minWidth: 80 },
  {
    id: "startedTime",
    label: "Started\u00a0Time",
    minWidth: 80,
  },
  {
    id: "view",
    label: "View Mission Recording",
    minWidth: 80,
  },
  {
    id: "stats",
    label: "Mission Analytics",
    minWidth: 80,
  },
];

//get the previously completed mission data from the firebase

export default function Statistics() {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //handling the table pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    firestore
      .collection("operations")
      .where("companyId", "==", "VtTjOxCyvrM64l6qX64WzIp3IPJ3") //remove this hardcoding
      .where("operationStatus", "==", "ended")
      .get()
      .then((querySnapshot) => {
        let tempMissionDataArray = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let tempMissionDataObject = {
            missionId: doc.id,
            date: doc.data().startDate,
            startedTime: doc.data().startTime,
          };
          tempMissionDataArray.push(tempMissionDataObject); //pushing each mission data to the array one by one
        });
        //set the request state
        setRequests(tempMissionDataArray);
      })
      .catch((error) => {
        console.log("Error getting mission data: ", error);
      });
  }, []);

  return (
    <Layout>
      <Container size="sm">
        <div>
          <Typography variant="h5" color="textSecondary">
            Past Missions
          </Typography>

          {/* the table */}

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
                                  <Button
                                    mini={true}
                                    variant="fab"
                                    zDepth={0}
                                    // onClick={() => approveUserRequest(request)}
                                  >
                                    <ThumbUp />
                                  </Button>
                                )}
                                {column.id === "stats" && (
                                  <Button
                                    mini={true}
                                    variant="fab"
                                    // onClick={() =>
                                    //   deleteUserRequest(request["id"])
                                    // }
                                  >
                                    <Delete style={{ color: "red" }} />
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
      </Container>
    </Layout>
  );
}

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
import PollIcon from "@material-ui/icons/Poll";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

//dialog box
import StatDialog from "../../components/headAdmin/statDialog";

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
  const [toDialogBox, setToDialogBox] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //session data
  const { currentUser } = useAuth();

  //dialog box
  const [open, setOpen] = useState(false);

  //handling the table pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatBoxClick = (data) => {
    setToDialogBox(data); //set the data to be send to the dialog box
    console.log(data.timeline);
    setOpen(true);
  };

  useEffect(() => {
    //get all the mission data of my company, where the status is "ended"
    firestore
      .collection("operations")
      .where("companyId", "==", currentUser.uid)
      .where("operationStatus", "==", "ended")
      .get()
      .then((querySnapshot) => {
        let tempMissionDataArray = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let tempMissionDataObject = {
            missionId: doc.id,
            date: doc.data().startDate,
            startedTime: doc.data().startTime,
            timeline: doc.data().timeline,
            endTime: doc.data().endTime,
          };
          // const propertyValues = Object.values(tempMissionDataObject.timeline);
          // console.log("timeline type", propertyValues[0]);
          console.log(tempMissionDataObject.endTime.seconds);
          tempMissionDataArray.push(tempMissionDataObject); //pushing each mission data to the array one by one
        });
        //set the request state - this is used to display the table
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
                                    <PlayCircleFilledWhiteIcon
                                      style={{ color: "#039BE5" }}
                                    />
                                  </Button>
                                )}
                                {column.id === "stats" && (
                                  <div>
                                    <Button
                                      mini={true}
                                      variant="fab"
                                      onClick={() =>
                                        handleStatBoxClick(request)
                                      }
                                      // onClick={() =>
                                      //   deleteUserRequest(request["id"])
                                      // }
                                    >
                                      <PollIcon style={{ color: "orange" }} />
                                    </Button>

                                    {/* the mission data dialog box */}

                                    <StatDialog
                                      open={open}
                                      setOpen={setOpen}
                                      data={toDialogBox}
                                    />
                                  </div>
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
              rowsPerPageOptions={[5, 10, 25, 100]}
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

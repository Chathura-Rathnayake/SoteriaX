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
import { Button, Grid } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import PollIcon from "@material-ui/icons/Poll";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { storage } from "../../firebase";
import { Line } from "react-chartjs-2";

//dialog box
import StatDialog from "../../components/headAdmin/statDialog";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 250,
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
  // const [cases, setCases] = useState([]);
  const [casesCount, setCasesCount] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [totalMissions, setTotalMissions] = useState();
  const [avgResponse, setAvgReponse] = useState();
  const [avgMissionTime, setAvgMissionTime] = useState();

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

  const handleLinkClick = (data) => {
    // Create a reference to the file we want to download
    var storageRef = storage.ref();
    var videosRef = storageRef.child(
      `operation/${currentUser.uid}/${data.missionId}.webm`
    );

    async function getVideoLink() {
      try {
        const response = await videosRef.getDownloadURL();
        console.log(response);
        // setVideoLink(response);
        window.open(response);
      } catch (err) {
        console.log(err);
      }
    }
    getVideoLink();
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
        let tempCasesArray = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let tempMissionDataObject = {
            missionId: doc.id,
            date: doc.data().startDate,
            startedTime: doc.data().startTime,
            timeline: doc.data().timeline,
            endTime: doc.data().endTime,
          };

          tempCasesArray.push(tempMissionDataObject.date);
          tempMissionDataArray.push(tempMissionDataObject); //pushing each mission data to the array one by one
        });
        //set the request state - this is used to display the table
        setRequests(tempMissionDataArray);

        //counting cases reported in each month to plot the graph
        let monthsArray = [];
        let arrayLength = tempCasesArray.length;
        //putting month from all the date values read to a new array called monthsArray
        for (let i = 0; i < arrayLength; i++) {
          let dateParts = tempCasesArray[i].split("/");
          monthsArray.push(dateParts[0]);
        }

        //counting distinct values in the months array
        let counts = {};
        for (let i = 0; i < monthsArray.length; i++) {
          counts[monthsArray[i]] = 1 + (counts[monthsArray[i]] || 0);
        }
        console.log(counts);

        let tempCasesCount = []; //this array will hold the cases reported in each month for all completed missions
        for (let i = 1; i <= 12; i++) {
          if (counts[i]) {
            tempCasesCount.push(counts[i]);
          } else {
            tempCasesCount.push(0);
          }
        }
        setCasesCount(tempCasesCount); //set the cases count
      })
      .catch((error) => {
        console.log("Error getting mission data: ", error);
      });
  }, []);

  const caseData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Drowning Cases",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "#FFB344",
        borderColor: "#E05D5D",
        borderWidth: 2,
        data: casesCount,
      },
    ],
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Container size="sm">
            <div>
              <Typography variant="h6" color="textSecondary">
                Past Missions
              </Typography>
              <br />

              {/* the table */}

              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader size="small" aria-label="sticky table">
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
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
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
                                        onClick={() => handleLinkClick(request)}
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
                                          <PollIcon
                                            style={{ color: "orange" }}
                                          />
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
        </Grid>

        <Grid item xs={8}>
          <Container size="sm">
            <Paper style={{ padding: "10px" }}>
              <Typography variant="subtitle1" align="center" color="initial">
                Number of drowning cases with the time of the year
              </Typography>

              <div>
                <Line
                  width={120}
                  height={230}
                  data={caseData}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    title: {
                      display: true,
                      text: "",
                      fontSize: 20,
                    },
                    legend: {
                      display: false,
                      position: "right",
                    },
                  }}
                />
              </div>
            </Paper>
          </Container>
        </Grid>

        <Grid item xs={4}>
          <Container size="sm">
            <Paper style={{ padding: "10px" }}>
              <Paper
                style={{
                  padding: "10px",
                  backgroundColor: "#efefef",
                  align: "center",
                }}
                elevation={0}
              >
                <Typography
                  variant="subtitle1"
                  color="primary"
                  style={{ fontWeight: "bold" }}
                >
                  Total Completed Missions ~ 56
                </Typography>
                <Typography align="center" variant="caption" color="initial">
                  The total amount of completed missions
                </Typography>
              </Paper>
              <br />
              <Paper
                style={{ padding: "10px", backgroundColor: "#efefef" }}
                elevation={0}
              >
                <Typography
                  variant="subtitle1"
                  color="primary"
                  style={{ fontWeight: "bold" }}
                >
                  Average Response Time ~ 56
                </Typography>
                <Typography variant="caption" color="initial">
                  Average time to reach the victim and drop the restube
                </Typography>
              </Paper>
              <br />
              <Paper
                style={{ padding: "10px", backgroundColor: "#efefef" }}
                elevation={0}
              >
                <Typography
                  variant="subtitle1"
                  color="primary"
                  style={{ fontWeight: "bold" }}
                >
                  Average Mission Duration ~ 56
                </Typography>
                <Typography variant="caption" color="initial">
                  The average time to complete a resuce mission
                </Typography>
              </Paper>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </Layout>
  );
}

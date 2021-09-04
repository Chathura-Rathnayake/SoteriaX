import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Layout from "../../components/headAdmin/Layout";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { useAuth } from "../../contexts/AuthContext.js";
import { useHistory } from "react-router-dom";
import Notification from "../../components/headAdmin/Notification";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles({
    // root: {
    //     width: "100%",
    //     overflowX: "auto",
    // },
    // table: {
    //     minWidth: 650,
    // },
    bot: {
        marginBottom: 10,
    },
    top50: {
        marginTop: 20,
    },
    top70: {
        marginTop: 70,
    },
    card: {
        marginTop: "30px",
        marginLeft: "50px",
    },
    bold400: {
        fontWeight: 600,
    },
});

// function createData(name, calories, fat, carbs, protein, num1, num2) {
//   return { name, calories, fat, carbs, protein, num1, num2 };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 23, [
//     {
//       id: "EMP-LG-032",
//       username: "RonPerera",
//       lastName: "Perera",
//       firstName: "Ron",
//       age: 35,
//     },
//   ]),
// ];

// const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
//     const [isExpanded, setIsExpanded] = React.useState(false);

//     return (
//         <>
//             <TableRow {...otherProps}>
//                 <TableCell padding="checkbox">
//                     <IconButton onClick={() => setIsExpanded(!isExpanded)}>
//                         {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                 </TableCell>
//                 {children}
//             </TableRow>
//             {isExpanded && (
//                 <TableRow>

//                     {expandComponent}
//                 </TableRow>
//             )}
//         </>
//     );
// };

export default function TrainingRecords() {
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
        num: "",
    });
    const classes = useStyles();
    const [data, getData] = useState([]);
    const { currentUser } = useAuth();
    const renderDetailsButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        
                    }}
                >
                    view Details
                </Button>
            </strong>
        )
      }
      const columns = [
        {
            field: 'id', 
            headerName: 'Unique-ID', 
            width: 220 , 
            headerAlign: 'left',
         },
        {
            field: "title", 
            headerName: 'Session title', 
            width: 180 , 
            headerAlign: 'left',
         },

        {
          field: 'date',
          headerName: 'Sheduled Date',
          width: 170,
          headerAlign: 'center',
        },
          {
            field: 'startTime',
            headerName: 'Sheduled Time',
            width: 150,
            headerAlign: 'center',
          },
        //   {
        //     field: 'lastName',
        //     headerName: 'Last name',
        //     width: 150,
        //     headerAlign: 'center',
        //   },

          {
            field: 'Edit',
            headerName: 'Edit',
            renderCell: renderDetailsButton,
            disableClickEventBubbling: true,
            width: 200,
            align:'center',
            headerAlign: 'center',
            
          },
        ];

    useEffect(() => {
        async function getList() {
            const idToken = await currentUser.getIdToken(true); //get the token of the current user
            const toSend = {
                token: idToken,
            };
            try {
                fetch("/getTrainingRecords", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(toSend),
                })
                    .then((res) => res.json()) //retrieving the request from backend
                    .then((data) => getData(data)); //printing it to the console
            } catch (err) { }
        }
        getList(); //executing it
    }, []);

    console.log(data);
    return (
        <Layout>
            <Container size="sm">
                {/* <div class={classes.top50}>
                    <Typography
                        align="center"
                        variant="h5"
                        className={classes.bold400}
                        color="textSecondary"
                    >
                        Training Records
                    </Typography>
                </div>
                <div class={classes.top70}></div>
                <Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.root}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox" />
                                        <TableCell>Session Title</TableCell>
                                        <TableCell align="right">Scheduled Date</TableCell>
                                        <TableCell align="right">Scheduled Time</TableCell>
                                        <TableCell align="right">Time-Taken</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row) => (
                                        <ExpandableTableRow
                                            key={row.docID}
                                            expandComponent={
                                                <Grid>
                                                    <TableRow>
                                                        <TableCell colSpan="2">Description : </TableCell>
                                                        <TableCell colSpan="3">{row.summary}</TableCell>
                                                    </TableRow>
                                                </Grid>

                                            }
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.docID}
                                            </TableCell>
                                            <TableCell align="right">{row.date}</TableCell>
                                            <TableCell align="right">{row.startTime}</TableCell>
                                            <TableCell align="right">{row.trainingTimes[4]}</TableCell>
                                        </ExpandableTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>

                    </Grid>

                    <div class={classes.top70}></div>
                    <Grid>

                        <Paper>
                            <div class={classes.top70}></div>
                            <Grid item xs={6} >
                                <Typography
                                    align="center"
                                    variant="h6"
                                    className={classes.bold400}
                                    color="textSecondary"
                                >
                                    Search Records :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    align="center"
                                    required={true}
                                    name="id"
                                    label="Session ID"
                                   
                                />

                            </Grid>
                            <div class={classes.top70}></div>
                        </Paper>
                    </Grid>
                    <Notification notify={notify} setNotify={setNotify} />
                </Grid> */}

<div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        autoHeight
        rows={data}
        columns={columns}
        pageSize={6}
        onRowDoubleClick
        disableSelectionOnClick
      />
    </div>
            </Container>
        </Layout>
    );
}

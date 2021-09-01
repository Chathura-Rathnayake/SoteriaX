import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
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
import { Link, useHistory } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';

const columns = [
  { id: "companyID",numeric: false,disablePadding: true,label: "Company ID" },
  { id: "userID", numeric: false, disablePadding: false, label: "User ID" },
  { id: "userType", numeric: false, disablePadding: false, label: "User Type" },
  { id: "headline", numeric: false, disablePadding: false, label: "Subject" },
  { id: "date", numeric: false, disablePadding: false, label: "Date" },
  { id: "view",label: "View"},
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function SuggestionTable() {
  //front end page rendering related data
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/adminSuggestion")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  

  return (
    <div>
      <Typography variant="h5" color="initial">
        Suggestions
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
            {/* <TableBody>
              {data
                //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={data.userID}
                    >
                      {columns.map((column) => {
                        const value = data[column.id];
                        return (
                          <TableCell key={column.id}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                            {column.id === "view" && (
                              <Link className="button" to="/adminDashboard">
                                <Button mini={true} variant="fab" zDepth={0}>
                                  <Visibility />
                                </Button>
                              </Link>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody> */}
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </div>
    // <div>
    //   <h1>The Name: {data.companyID}</h1>
    //   <h1>The Age: {data.date}</h1>
    // </div>
  );
}

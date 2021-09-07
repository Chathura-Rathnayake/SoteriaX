import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Visibility from '@material-ui/icons/Visibility';
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import CustomizedDialogs from "./popUp"
//import tableData from "../../data";

// function createData(id, name, email, subject, date) {
//     return { id, name, email, subject, date };
//   }
  
//   const rows = [
//     createData(1, 'Pasindu Perera', 'pasindu@123.com', 'System not working', '12/07/2021'),
//     createData(2, 'Udayanga Peiris', 'uda@123.com', 'Logging problem', '11/07/2021'),
//     createData(3, 'Govinda Kumar', 'gok@123.com', 'Dead bodies everywhere', '30/06/2021'),
//     createData(4, 'Pasindu Perera', 'pasindu@123.com', 'We did the best', '23/06/2021'),
//     createData(5, 'Hasanka Rathnayake', 'kalu@123.com', 'We bleed Green', '27/06/2021'),
//     createData(6, 'Hasanka Rathnayake', 'kalu@123.com', 'We bleed Green', '27/06/2021'),
//   ];

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class EnhancedTable extends React.Component {

  state = {
    order: "asc",
    orderBy: "id",
    selected: [],
    rows: [],
    page: 0,
    rowsPerPage: 5,
  };

  componentDidMount() {
    fetch('/adminSuggestion')
    .then((response) => response.json())
    .then(data => {
        this.setState({ rows: data });
    });
}

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.rows.map(n => n.suggestionID) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { rows, order, orderBy, selected, rowsPerPage, page } = this.state;
  
    const emptyRows =rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.suggestionID);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.suggestionID)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      {/* <TableCell align="left">{n.companyID}</TableCell> */}
                      <TableCell align="left">{n.name}</TableCell>
                      <TableCell align="left">{n.accountType}</TableCell>
                      <TableCell align="left">{n.headline}</TableCell>
                      <TableCell align="left">{n.date}</TableCell>
                      <TableCell>
                        
                          {/* <Button mini={true} variant="fab" zDepth={0}>
                            <Visibility />
                          </Button> */}
                          <CustomizedDialogs
                           suggestionID={n.suggestionID}
                           name={n.name}
                           accountType={n.accountType}
                           headline={n.headline}
                           date={n.date}
                           userID={n.userID}
                           msg={n.msg}
                           companyID={n.companyID} 
                           />  
                        
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);

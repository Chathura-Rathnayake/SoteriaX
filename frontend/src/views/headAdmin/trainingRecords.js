// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import { Grid } from '@material-ui/core';

// import Container from "@material-ui/core/Container";
// import Layout from "../../components/headAdmin/Layout";

// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//   },
// });

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       { date: '2020-01-05', customerId: '11091700', amount: 3 },
//       { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
//     ],
//   };
// }

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);
//   const classes = useRowStyles();

//   return (
//     <Layout>
//     <Container>
//         <Typography
//           align='center'
//           variant="h3"
          
//           color="textSecondary"
//         >
//           Statistic Data
//         </Typography>
//       <TableRow className={classes.root}>
//         <TableCell>
//           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {row.name}
//         </TableCell>
//         <TableCell align="right">{row.calories}</TableCell>
//         <TableCell align="right">{row.fat}</TableCell>
//         <TableCell align="right">{row.carbs}</TableCell>
//         <TableCell align="right">{row.protein}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography variant="h6" gutterBottom component="div">
//                 History
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell align="right">Amount</TableCell>
//                     <TableCell align="right">Total price ($)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.date}>
//                       <TableCell component="th" scope="row">
//                         {historyRow.date}
//                       </TableCell>
//                       <TableCell>{historyRow.customerId}</TableCell>
//                       <TableCell align="right">{historyRow.amount}</TableCell>
//                       <TableCell align="right">
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </Container>
//   </Layout>

 
//   );
// }

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
// ];

// export default function CollapsibleTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <Row key={row.name} row={row} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }











import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Layout from "../../components/headAdmin/Layout";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { useAuth } from "../../contexts/AuthContext.js";
import { useHistory} from 'react-router-dom'
import Notification from "../../components/headAdmin/Notification";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto'
      },
      table: {
        minWidth: 650
      },
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


function createData(name, calories, fat, carbs, protein,num1 ,num2) {
    return { name, calories, fat, carbs, protein,num1,num2 };
  }
  

  const rows = [
    createData(
      'Frozen yoghurt',
      159,
      6.0,
      24,
      23,
      [
        { id: 'EMP-LG-032', username: 'RonPerera', lastName: 'Perera', firstName: 'Ron', age: 35 },
        { id: 'EMP-LG-021',username: 'AmilaS', lastName: 'Silva', firstName: 'Amila', age: 45 },
        { id: 'EMP-LG-082',username: 'GunaKamal', lastName: 'Gunarathne', firstName: 'Kamal', age: 51 },
        { id: 'EMP-LG-011',username: 'Susantha84', lastName: 'Desilva', firstName: 'Susantha', age: 46 },
        { id: 'EMP-LG-014',username: 'kapilaWili', lastName: 'Wimalarathne', firstName: 'Kapila', age: 37 },
        { id: 'EMP-LG-005',username: 'ThusharaSW', lastName: 'Wickrama', firstName: 'Thushara', age: 29 },
        { id: 'EMP-LG-010',username: 'Haritha13', lastName: 'Peris', firstName: 'Harith', age: 43 },
      ],

      
    ),

  ];
  
  const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
  
    return (
      <>
        <TableRow {...otherProps}>
          <TableCell padding="checkbox">
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {children}
        </TableRow>
        {isExpanded && (
          <TableRow>
            <TableCell padding="checkbox" />

            {expandComponent.map((data) => (
                <TableCell >{data.id}</TableCell>
                
            ))
            
            }
          </TableRow>
        )}
      </>
    );
  };
  

export default function TrainingRecords() {
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '',num:'' })
  const [state, setState] = React.useState({type: "",});
  const classes = useStyles();
  let uid;
  useAuth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      uid = idToken;
    });

  return (
    <Layout>
      <Container size="sm">
        <div class={classes.top50}>
          <Typography
            align='center'
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
            <TableCell align="right">Time Taken</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <ExpandableTableRow
              key={row.name}
              expandComponent={row.num1
            //   <TableCell colSpan="5">{row.num1.dadsa}</TableCell>
            
            }
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>   
          </Grid>
          <Notification notify={notify} setNotify={setNotify} />
        </Grid>
      </Container>
    </Layout>
  );
}

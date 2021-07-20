import React from 'react';
import { CssBaseline, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Layout from '../../components/Admin/sideNhead';
import EnhancedTable from '../../components/Admin/suggestions/DataTable';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#333996",
        light: '#3c44b126'
      },
      secondary: {
        main: "#f83245",
        light: '#f8324526'
      },
      background: {
        default: "#f4f5fd"
      },
    },
  })
  
  
  const useStyles = makeStyles({
    appMain: {
      padding: '5px 10px',
      height: '80px',
      width: '100%',
      paddingTop: '50px',
    }
  })

function Suggestions()
{
    const classes = useStyles();
    return(
        <Layout >
         <ThemeProvider theme = {theme}>
            <div className={classes.appMain}>
                <EnhancedTable/>
            </div>
            <CssBaseline />
        </ThemeProvider>
        </Layout>
    );
}

export default Suggestions;
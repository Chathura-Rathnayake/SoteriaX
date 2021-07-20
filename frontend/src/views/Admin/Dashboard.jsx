import React from 'react';
import { CssBaseline, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Layout from '../../components/Admin/sideNhead';

import { Link } from "react-router-dom";
import { orange } from "@material-ui/core/colors";
import Assessment from "@material-ui/icons/Assessment";
import EmojiEmotions from '@material-ui/icons/EmojiEmotions';
import HowToVote from "@material-ui/icons/HowToVote";
import Grid from "@material-ui/core/Grid";
import InfoBox from '../../components/Admin/infoBox';

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

function Dashboard()
{
    const classes = useStyles();
    return(
        <Layout >
         <ThemeProvider theme = {theme}>
            <div className={classes.appMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} >
                    <InfoBox Icon={HowToVote} color={orange[600]} title="New suggestions" value="5" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <InfoBox Icon={EmojiEmotions} color={orange[600]} title="New complaints" value="12" />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                    <InfoBox Icon={Assessment} color={orange[600]} title="New help requests " value="23" />
                    </Grid>
                    
                </Grid>
            </div>
            <CssBaseline />
        </ThemeProvider>
        </Layout>
    );
}

export default Dashboard;
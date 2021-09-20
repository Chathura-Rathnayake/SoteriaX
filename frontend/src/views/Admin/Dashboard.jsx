import React, { useState, useEffect } from "react";
import { CssBaseline, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Layout from '../../components/Admin/sideNhead';

import { Link } from "react-router-dom";
import { orange } from "@material-ui/core/colors";
import Assessment from "@material-ui/icons/Assessment";
import EmojiEmotions from '@material-ui/icons/EmojiEmotions';
import HowToVote from "@material-ui/icons/HowToVote";
import LiveHelp from "@material-ui/icons/LiveHelp";
import GroupRounded from "@material-ui/icons/GroupRounded";
import Email from "@material-ui/icons/Email";
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
      const [count1, setSugCount] = useState();
      const [count2, setComCount] = useState();
      const [count3, setHRCount] = useState();
      const [count4, setHLGCount] = useState();
      const [count5, setURCount] = useState();


      useEffect(() => {
        try{
          fetch("/DboardSuggestion")
            .then((res) => res.json())
            .then((data) => setSugCount(data));
          } catch (err) {}

        try{ 
          fetch("/DboardComplaint")
            .then((res) => res.json())
            .then((data) => setComCount(data));  
          } catch (err) {}

        try{ 
          fetch("/DboardHR")
            .then((res) => res.json())
            .then((data) => setHRCount(data));  
          } catch (err) {}
        try{ 
          fetch("/DboardHLG")
            .then((res) => res.json())
            .then((data) => setHLGCount(data));  
          } catch (err) {}
        try{ 
          fetch("/DboardUR")
            .then((res) => res.json())
            .then((data) => setURCount(data));  
          } catch (err) {}    

          }, [])
     
        
      // useEffect(() => {
          
      //     }, [])        
    
    return(
        <Layout >
         <ThemeProvider theme = {theme}>
            <div className={classes.appMain}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} >
                      {count5 ?
                        <InfoBox Icon={Email} color={orange[600]} title="Registration request" value={count5} />
                        :
                        <InfoBox Icon={Email} color={orange[600]} title="Registration request" value={0} />
                      }
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {count4 ?
                        <InfoBox Icon={GroupRounded} color={orange[600]} title="Head lifeguard accounts" value={count4} />
                        :
                        <InfoBox Icon={GroupRounded} color={orange[600]} title="Head lifeguard accounts" value={0} />
                      }  
                    </Grid>
                    
                    
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} >
                      {count1 ?
                        <InfoBox Icon={HowToVote} color={orange[600]} title="New suggestions" value={count1} />
                        :
                        <InfoBox Icon={HowToVote} color={orange[600]} title="New suggestions" value={0} />
                      }
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      {count2 ?
                        <InfoBox Icon={EmojiEmotions} color={orange[600]} title="New complaints" value={count2} />
                        :
                        <InfoBox Icon={EmojiEmotions} color={orange[600]} title="New complaints" value={0} />
                      }  
                    </Grid>
                    <Grid item xs={12} sm={4} >
                      {count3 ?
                        <InfoBox Icon={LiveHelp} color={orange[600]} title="New help requests " value={count3} />
                        :
                        <InfoBox Icon={LiveHelp} color={orange[600]} title="New help requests " value={0} />
                      }  
                    {console.log(count1, count2, count3 )}
                    </Grid>
                    
                </Grid>
            </div>
            <CssBaseline />
        </ThemeProvider>
        </Layout>
    );
}

export default Dashboard;
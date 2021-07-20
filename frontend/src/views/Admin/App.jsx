import React from 'react';
//import SideBar from '../../components/Admin/sideBar';
import { CssBaseline, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import HeadLG from './headLG';
import Layout from '../../components/Admin/sideNhead';
//import Header from '../../components/Admin/header';


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
    // overrides:{
    //   MuiAppBar:{
    //     root:{
    //       transform:'translateZ(0)'
    //     }
    //   }
    // },
    // props:{
    //   MuiIconButton:{
    //     disableRipple:true
    //   }
    // }
  })
  
  
  const useStyles = makeStyles({
    appMain: {
      // paddingLeft: '320px',
      width: '100%'
    }
  })

function App()
{
    const classes = useStyles();
    return(
        <Layout >
         <ThemeProvider theme = {theme}>
             {/* <SideBar /> */}
            <div className={classes.appMain}>
                {/* <Header /> */}
                <HeadLG />
            </div>
            <CssBaseline />
        </ThemeProvider>
        </Layout>
    );
}

export default App;

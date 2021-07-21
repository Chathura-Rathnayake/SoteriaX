import React, { useState } from "react";
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory, useLocation,Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Box from '@material-ui/core/Box';
import {PlayArrow,DashboardOutlined,ArrowDropDown,TrackChangesOutlined,LiveHelp,GroupRounded,Timeline} from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import { format } from 'date-fns'
import Avatar from '@material-ui/core/Avatar'
import uxceo from "../assets/images/headguard.png";
import logo from "../assets/icons/logoColor.png";
import { useAuth } from "../contexts/AuthContext";

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    bot:{
      marginBottom:30,
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      
    },
    drawerPaper: {
      width: drawerWidth,
      
    },
    active: {
      background: '#F0F0F0'
    },
    title: {
      padding: theme.spacing(4),
      
      
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0)
    }
  }
})

export default function Layout({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const menuItems = [

    { 
      text: 'Live Operation', 
      icon: <PlayArrow color="black" />, 
      path: '/Live'
    },
    { 
      text: 'Dashboard', 
      icon: <DashboardOutlined color="secondary" />, 
      path: '/Adashboard' 
    },

    { 
      text: 'Member access', 
      icon: <GroupRounded color="secondary" />, 
      path: '/members'
    },
    { 
      text: 'Training', 
      icon: <TrackChangesOutlined color="secondary" />, 
      path: '/training'
    },
    { 
      text: 'Operation statistics', 
      icon: <Timeline color="secondary" />, 
      path: '/opstat'
    },
    { 
      text: 'Support', 
      icon: <LiveHelp color="secondary" />, 
      path: '/support'
    },

  ];

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar 
        position="fixed" 
        className={classes.appBar}
        elevation={5}
        color="b"
      >
        <Toolbar>
          <Typography className={classes.date}>
          Head-Lifeguard Dashboard{/* {format(new Date(), 'do MMMM Y')} */}
          </Typography>
        

          <Button
            margin="0"
            size="large"
            onClick={handleLogout}
            style={{
              // fontWeight: "bold",
              textTransform: "none",
            }}
          >
            <Avatar className={classes.avatar} src={uxceo} />
            <ArrowDropDown size="large" />
            Log Out
          </Button>

        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
       
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div class={classes.bot}></div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center" 
          >
          <Box
            maxHeight="12vh"
            maxWidth="11vw"
          >
          <img href=" " src={logo}  alt="" />
          </Box>
        </Box>
        <div class={classes.bot}></div>
        {/* links/list section */}
        <Box>
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        
        </List>
        </Box>
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  )
}

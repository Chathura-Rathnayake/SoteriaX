import React, { useState } from "react";
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory, useLocation, Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Box from '@material-ui/core/Box';
import {PlayArrow,DashboardOutlined,ArrowDropDown,TrackChangesOutlined,LiveHelp,GroupRounded,Timeline} from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { format } from 'date-fns'
import Avatar from '@material-ui/core/Avatar'
import uxceo from "../../assets/images/headguard.png";
import logo from "../../assets/icons/logoColor.png";
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import { useAuth } from "../../contexts/AuthContext";
import DescriptionIcon from '@material-ui/icons/Description';
const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
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

      background: 'linear-gradient(0deg, #e0e0e0 0%, #ffffff 100%)',
      width: drawerWidth,
      
    },
    active: {
      background: 'linear-gradient(270deg, #039be5 0%, #d0d0d0 2%)',
      
    },
    title: {
      padding: theme.spacing(4),
      
      
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1,
      
    },
    toolbar: theme.mixins.toolbar,
    avatar: {

      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
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
      path: '/live'
    },
    { 
      text: 'Dashboard', 
      icon: <DashboardOutlined color="secondary" />, 
      path: '/Adashboard' 
    },

    { 
      text: 'Member Access', 
      icon: <GroupRounded color="secondary" />, 
      path: '/members'
    },
    { 
      text: 'Training', 
      icon: <TrackChangesOutlined color="secondary" />, 
      path: '/training'
    },
    { 
      text: 'Training Records', 
      icon: <DescriptionIcon color="secondary" />, 
      path: '/trainingRecords'
    },
    { 
      text: 'Operation Statistics', 
      icon: <Timeline color="secondary" />, 
      path: '/statisticsData'
    },
    { 
      text: 'Support', 
      icon: <LiveHelp color="secondary" />, 
      path: '/support'
    },
    { 
      text: 'Help Inbox', 
      icon: <MoveToInboxIcon color="secondary" />, 
      path: '/requestInbox'
    },
  ];

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar 
        position="fixed" 
        className={classes.appBar}
        elevation={5}
        color="white"
       
      >
        <Toolbar>
          <Typography className={classes.date}>
          Head-Lifeguard Dashboard - {format(new Date(), 'do MMMM Y')}
          </Typography>
        
          <Button 
            color="primary"
            margin="0"
            size="large"
            onClick={handleLogout}
            style={{
              // fontWeight: "bold",
              textTransform: "none",
            }}
          >
            <Avatar className={classes.avatar} src={uxceo} />
           
           <strong> Log Out </strong>
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

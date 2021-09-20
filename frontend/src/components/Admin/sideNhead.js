import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import {
  Email,
  DashboardOutlined,
  ArrowDropDown,
  EmojiEmotions,
  LiveHelp,
  GroupRounded,
  Timeline,
  HowToVote,
} from "@material-ui/icons";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { format } from "date-fns";
import Avatar from "@material-ui/core/Avatar";
import uxceo from "../../assets/images/headguard.png";
import logo from "../../assets/icons/logoColor.png";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    bot: {
      marginBottom: 30,
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#F0F0F0",
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
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
    },
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardOutlined color="secondary" />,
      path: "/adminDashboard",
    },

    {
      text: "Registrations",
      icon: <Email color="secondary" />,
      path: "/adminProfile",
    },
    {
      text: "Profile Management",
      icon: <GroupRounded color="secondary" />,
      path: "adminManagement",
    },

    {
      text: "Suggestions",
      icon: <HowToVote color="secondary" />,
      path: "/adminSuggestion",
    },
    {
      text: "Complaints",
      icon: <EmojiEmotions color="secondary" />,
      path: "/adminComplaint",
    },
    {
      text: "Help requests",
      icon: <LiveHelp color="secondary" />,
      path: "/adminHelpRequest",
    },
  ];

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
            {format(new Date(), "do MMMM Y")}
          </Typography>
          {/* <Typography variant="subtitle1" >
              {"The Admin Dashboard"}
            </Typography>
        */}

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
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box maxHeight="12vh" maxWidth="11vw">
            {/* style={{width:'100px',height:'100px'}} */}
            <img
              style={{ width: "139px", height: "96px" }}
              href=" "
              src={logo}
              alt=""
            />
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
                className={
                  location.pathname == item.path ? classes.active : null
                }
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
        {children}
      </div>
    </div>
  );
}

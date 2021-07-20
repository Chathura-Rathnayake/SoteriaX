import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import homePage from "./views/homePage";
import aboutPage from "./views/aboutPage";
import login from "./views/login";
import forgetPassword from "./views/forgetPassword";
import ADashboard from "./views/ADashboard";
import Members from "./views/Members";
import AddUser from "./views/addUser";
import Admin from "./views/admin";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import PrivateRouteHeadlifeguard from "./components/PrivateRouteHeadlifeguard";
import HeadlifeguardRequest from "./components/headlifeguardRequest";
import Dashboard from "./views/Admin/Dashboard";
import App from "./views/Admin/App";
import Complaints from "./views/Admin/Complaints";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#039be5",
    },
    secondary: {
      main: "#ef6c00",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <AuthProvider>
          {/* unrestricted routes */}
          <Route exact path="/" component={homePage} />
          <Route exact path="/aboutPage" component={aboutPage} />
          <Route exact path="/login" component={login} />
          <Route exact path="/forgetPassword" component={forgetPassword} />
          <Route
            exact
            path="/headlifeguardRequest"
            component={HeadlifeguardRequest}
          />

          {/* restricted routes  - admin*/}
          <PrivateRouteAdmin exact path="/admin" component={Admin} />
          <Route exact path="/adminProfile" component={App} />
          <Route exact path="/adminDashboard" component={Dashboard} />
          <Route exact path="/adminComplaint" component={Complaints} />

          {/* restricted routes  - headlifeguard*/}
          <PrivateRouteHeadlifeguard
            exact
            path="/adashboard"
            component={ADashboard}
          />
          <PrivateRouteHeadlifeguard
            exact
            path="/members"
            component={Members}
          />

          <Route exact path="/addUser" component={AddUser} />
        </AuthProvider>
      </Switch>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import homePage from "./views/homePage";
import aboutPage from "./views/aboutPage";
import login from "./views/login";
import forgetPassword from "./views/forgetPassword";
import ADashboard from "./views/headAdmin/ADashboard";
import Members from "./views/headAdmin/Members";
import Training from "./views/headAdmin/training-form";
import Support from "./views/headAdmin/support";
import RequestData from "./views/headAdmin/previousData";
import Live from "./views/headAdmin/live";
import AddUser from "./views/addUser";
import Admin from "./views/admin";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import PrivateRouteHeadlifeguard from "./components/PrivateRouteHeadlifeguard";
import HeadlifeguardRequest from "./components/headlifeguardRequest";
import Dashboard from "./views/Admin/Dashboard";
import App from "./views/Admin/App";
import Complaints from "./views/Admin/Complaints";
import Suggestions from "./views/Admin/Suggestions";
import HelpRequest from "./views/Admin/HelpRequest";
import Profiles from "./views/Admin/Profiles";
import TrainingRecords from "./views/headAdmin/trainingRecords";
import Statistics from "./views/headAdmin/statistics";
import SetPassword from "./views/headAdmin/setPassword";
//import test from "./views/practice material/test"; 
import TestParent from "./views/practice material/testParent"; 

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
          {/* <Route exact path="/test" component={test} /> */}
          <Route exact path="/SetPassword" component={SetPassword} />
          <Route exact path="/testparent" component={TestParent} />

          {/* <Route exact path="/setPassword" component={SetPassword} /> */}
          {/* restricted routes  - admin*/}
          <PrivateRouteAdmin exact path="/admin" component={Admin} />
          <PrivateRouteAdmin exact path="/adminProfile" component={App} />
          <PrivateRouteAdmin
            exact
            path="/adminDashboard"
            component={Dashboard}
          />
          <PrivateRouteAdmin
            exact
            path="/adminManagement"
            component={Profiles}
          />
          <PrivateRouteAdmin
            exact
            path="/adminComplaint"
            component={Complaints}
          />
          <PrivateRouteAdmin
            exact
            path="/adminSuggestion"
            component={Suggestions}
          />
          <PrivateRouteAdmin
            exact
            path="/adminHelpRequest"
            component={HelpRequest}
          />

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
          <PrivateRouteHeadlifeguard
            exact
            path="/training"
            component={Training}
          />
          <PrivateRouteHeadlifeguard
            exact
            path="/support"
            component={Support}
          />
          <PrivateRouteHeadlifeguard
            exact
            path="/requestInbox"
            component={RequestData}
          />
          <PrivateRouteHeadlifeguard
            exact
            path="/trainingRecords"
            component={TrainingRecords}
          />
          <PrivateRouteHeadlifeguard
            exact
            path="/statisticsData"
            component={Statistics}
          />
          {/* restricted routes  - headlifeguard*/}
          <PrivateRouteHeadlifeguard exact path="/live" component={Live} />

          <Route exact path="/addUser" component={AddUser} />
        </AuthProvider>
      </Switch>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);

reportWebVitals();

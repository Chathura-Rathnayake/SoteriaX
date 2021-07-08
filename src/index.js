import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import homePage from "./views/homePage";
import aboutPage from "./views/aboutPage";
import login from "./views/login";
import forgetPassword from "./views/forgetPassword";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={homePage} />
      <Route exact path="/aboutPage" component={aboutPage} /> 
      <Route exact path="/login" component={login} />
      <Route exact path="/forgetPassword" component={forgetPassword} /> 
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

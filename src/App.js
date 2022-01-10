import React from "react";
import LoginPage from "./components/LoginPage";
import Chart from "./components/Chart/Chart";
import Login from "./components/LoginPage";
import SignUp from "./components/SignUpPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

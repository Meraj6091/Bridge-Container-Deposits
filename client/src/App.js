import React from "react";
import LoginPage from "./components/LoginPage";
import Chart from "./components/Chart/Chart";
import Login from "./components/LoginPage";
import SignUp from "./components/SignUpPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContainerDeposits from "./components/ContainerDeposit";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/containerDeposits">
            <ContainerDeposits />
          </Route>
          <Route path="/importer">{/* <ContainerDeposits /> */}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

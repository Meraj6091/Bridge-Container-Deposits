import React from "react";
import LoginPage from "./components/LoginPage";
import Login from "./components/LoginPage";
import SignUp from "./components/SignUpPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContainerDeposits from "./components/ContainerDeposit";
import Entity from "./components/Entity";
import Importer from "./components/Importer";

function App() {
  return (
    <div>
      {/* <NavBar /> */}
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/containerDeposits">
            <ContainerDeposits />
          </Route>
          <Route path="/entity">
            <Entity />
          </Route>
          <Route path="/importer">
            <Importer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

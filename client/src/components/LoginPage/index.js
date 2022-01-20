import React, { useState, createContext } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../Helpers/Provider";
import { actionTypes } from "../../Helpers/reducer";
import NavBar from "../NavBar";
import { login } from "./service";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({});
  const [loggedIn, setLoggedIn] = useState();
  const [show, setShow] = useState();
  const [state, dispatch] = useStateValue();

  let history = useHistory();
  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(loginData);
    const { data } = await login(loginData);
    debugger;
    if (data.match) {
      if (data.admin) {
        dispatch({
          type: actionTypes.SET_USER,
          user: data.admin,
        });
      } else localStorage.removeItem("user");
      setLoggedIn(true);
      history.push("/containerDeposits");
    } else if (data.unMatch === true) {
      setLoggedIn(false);
      alert("Logging Details Are Wrong!");
    }
  };
  return (
    <>
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Login
        </h1>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={loginData.firstName}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  value={loginData.password}
                  required
                />
              </Form.Group>

              <Button variant="success btn-block" type="submit" value="submit">
                Login
              </Button>
              <br />

              {/* <Button
                variant="success btn-block"
                onClick={() => history.push("/")}
              >
                Back to Sign Up
              </Button> */}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;

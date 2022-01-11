import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { createAccount } from "./service";
const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    email: "meraj@gmail.com",
    confirmPassword: "123",
    date: "2022-01-11T06:30:30.125Z",
    firstName: "Meraj",
    lastName: "Rivisara",
    password: "123",
  });
  const [submitted, setIsSubmitted] = useState(false);
  let history = useHistory();
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(signUpData);
    const { data } = await createAccount(signUpData);
    debugger;
    if (data) {
      history.push("/login");
    }
  };

  return (
    <>
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Sign Up
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
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={signUpData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={signUpData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  id="lastName"
                  placeholder="lastName"
                  value={signUpData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={signUpData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  id="confirmPassword"
                  placeholder="confirmPassword"
                  value={signUpData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="success btn-block" type="submit" value="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          Copyright © 2021 Bridge 2020. All Rights Reserved.
        </h6>
      </Container>
    </>
  );
};

export default SignUp;

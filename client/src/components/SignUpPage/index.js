import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { createAccount } from "./service";
const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    confirmPassword: "",
    date: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  let history = useHistory();

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(signUpData);
    }
  }, [formErrors]);

  const validation = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      debugger;
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    // const regex =
    //   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // if (!signUpData.email || regex.test(signUpData.email) === false) {
    //   return false;
    // }
    return errors;
  };
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // emailValidation();
    console.log(signUpData);
    if (validation(signUpData)) {
      setFormErrors(validation(signUpData));
    }
    const { data } = await createAccount(signUpData);
    if (data) {
      if (data.password === data.confirmPassword) {
        debugger;
        history.push("/");
      } else {
        setIsSubmit(false);
        alert("Password Wrong!");
      }
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
                {formErrors.email && (
                  <p className="text-warning">{formErrors.email}</p>
                )}
                {/* <p>{formErrors.email}</p> */}
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
                Submit
              </Button>
              <br></br>
              <span style={{ fontSize: 18 }}>
                If you already have an account
                <Nav.Link style={{ display: "inline" }} href="/">
                  Login
                </Nav.Link>
              </span>
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

import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Nav, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../NavBar";
import { createAccount, getAllUsers } from "./service";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { async } from "exceljs/dist/exceljs";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    password: "",
    columns: [
      {
        dataField: "firstName",
        text: "First Name",
      },
      {
        dataField: "email",
        text: "Email",
      },
    ],
  });
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllRegisteredUsers();
  }, []);

  let formErrors = {};

  let history = useHistory();

  const validation = async (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      formErrors.errors = "Email is required!";
    } else if (!regex.test(values.email)) {
      formErrors.errors = "This is not a valid email format!";
    }
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
    await validation(signUpData);

    if (!formErrors.errors) {
      if (signUpData.password === signUpData.confirmPassword) {
        const { data } = await createAccount(signUpData);
        if (data) {
          history.push("/");
        }
      } else {
        alert("Password is Wrong!");
      }
    } else {
      alert("Invalid Email");
    }
  };

  //table
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: allUsers.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };
  const getAllRegisteredUsers = async () => {
    const { data } = await getAllUsers();
    setAllUsers(data);
  };
  return (
    <>
      <NavBar />
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
                {formErrors.errors && (
                  <p className="text-warning">{formErrors.errors}</p>
                )}
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
      </Container>
      <Container>
        <Card>
          <Card.Body>
            <BootstrapTable
              keyField="id"
              data={allUsers}
              columns={signUpData.columns}
              pagination={paginationFactory(options)}
            />
          </Card.Body>
        </Card>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          Copyright © 2021 Bridge 2020. All Rights Reserved.
        </h6>
      </Container>
      <br></br>
      <br></br>
    </>
  );
};

export default SignUp;

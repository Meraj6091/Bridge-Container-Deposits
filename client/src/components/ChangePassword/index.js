import React, { useState, createContext } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../Helpers/Provider";
import { actionTypes } from "../../Helpers/reducer";
import NavBar from "../NavBar";
import { changeLogin } from "./service";
import { ToastContainer } from "react-toastify";
import { openToast } from "../../Helpers/openToast";

const ChangePassword = () => {
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
    const currentUser = localStorage.getItem("currentLoggedInUser");
    const currentUserPassword = localStorage.getItem(
      "currentLoggedInUserPassword"
    );
    if (loginData.currentPassword === currentUserPassword) {
      const date = new Date();
      let postData = loginData;
      postData.updatedDate = date;
      postData.currentUser = currentUser;
      const { data } = await changeLogin(postData);
      if (data) {
        localStorage.setItem("currentLoggedInUserPassword", data.password);
        openToast("success", "Password Has been Changed");
        setLoginData({
          currentPassword: "",
          newPassword: "",
        });
      }
    } else openToast("warn", "Please Check the Password Again!");
  };
  return (
    <>
      <NavBar />
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Change Password
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
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Current Password"
                  id="currentPassword"
                  onChange={handleChange}
                  value={loginData.currentPassword}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  id="newPassword"
                  onChange={handleChange}
                  value={loginData.newPassword}
                  required
                />
              </Form.Group>

              <Button variant="success btn-block" type="submit" value="submit">
                Submit
              </Button>
              <br />
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ChangePassword;

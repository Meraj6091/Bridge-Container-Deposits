import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Navbar,
  Nav,
} from "react-bootstrap";
import logo from "../../images/logo.png";

import { Link, useHistory } from "react-router-dom";
import Importer from "../Importer";
import Select from "../../Helpers/Select/select";
import { BiLogOut } from "react-icons/bi";
const NavBar = () => {
  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="">
            <img src={logo} height={50} width={100} alt="Logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            <Nav.Link href="/containerDeposits">Container Deposits</Nav.Link>
            <Nav.Link href="/importer">Importer</Nav.Link>
            <Nav.Link href="/login" style={{ paddingLeft: 80 }}>
              Logout &nbsp;
              <BiLogOut />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default NavBar;

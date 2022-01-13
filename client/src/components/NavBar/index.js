import React, { useState, useEffect, useContext } from "react";
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
import { FaUser } from "react-icons/fa";

import { getUsers } from "./service/index";
import { useStateValue } from "../../Helpers/Provider";
const NavBar = () => {
  const [{ user }, useState] = useStateValue();

  return (
    <>
      <Navbar
        style={{ font: "#000000", backgroundColor: "#bfb9b7" }}
        fixed="top"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="">
            <img src={logo} height={50} width={100} alt="Logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            <Nav.Link href="/containerDeposits">Container Deposits</Nav.Link>
            <Nav.Link href="/importer">Importer</Nav.Link>
            &nbsp; &nbsp;
            {user && <Nav.Link href="/signup"> Create User &nbsp;</Nav.Link>}
            <Nav.Link href="/" style={{ paddingLeft: 80 }}>
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

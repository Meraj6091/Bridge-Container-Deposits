import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Home
        </h1>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            Welcome Home
          </Col>
        </Row>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          Copyright © 2021 Bridge 2020. All Rights Reserved.
        </h6>
      </Container>
    </>
  );
};

export default Home;

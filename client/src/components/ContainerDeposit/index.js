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
import { Link, useHistory } from "react-router-dom";
import Importer from "../Importer";
import Select from "../../Helpers/Select/select";
const ContainerDeposits = () => {
  const [containerData, setContainerData] = useState({});
  const [loggedIn, setLoggedIn] = useState();
  const [show, setShow] = useState();
  let history = useHistory();
  const handleSelectChange = (event, id) => {};
  const handleChange = (event) => {
    setContainerData({
      ...containerData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(containerData);
  };
  return (
    <>
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Container Deposits
        </h1>
        <Importer />

        <Form onSubmit={handleSubmit}>
          <Row className="ml-5">
            <Form.Group as={Col} md="5">
              <Form.Label>Entity</Form.Label>
              <Select
                required
                // options={packageReferences.map((selector) => ({
                //   label: selector.reference,
                //   value: selector.reference,
                // }))}

                onChange={(event) =>
                  handleSelectChange(event, "packageReference")
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="5">
              <Form.Label>Department</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Department"
                id="department"
                onChange={handleChange}
                value={containerData.department}
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>B/L Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="blType"
                id="blType"
                onChange={handleChange}
                value={containerData.blType}
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Bill of Landing Number</Form.Label>
              <Select
                // options={packageReferences.map((selector) => ({
                //   label: selector.reference,
                //   value: selector.reference,
                // }))}

                onChange={(event) =>
                  handleSelectChange(event, "packageReference")
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Shipment No</Form.Label>
              <Form.Control
                type="text"
                placeholder="Shipment No"
                id="shipmentNo"
                onChange={handleChange}
                value={containerData.shipmentNo}
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Po Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Po Number"
                id="poNo"
                onChange={handleChange}
                value={containerData.poNo}
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label> Client Po Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Po Number"
                id="clientPoNo"
                onChange={handleChange}
                value={containerData.clientPoNo}
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Shipment Volume</Form.Label>
              <Form.Control
                type="text"
                placeholder="Shipment Volume"
                id="shipmentVolume"
                onChange={handleChange}
                value={containerData.shipmentVolume}
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Carrier</Form.Label>
              <Form.Control
                type="text"
                placeholder="Carrier"
                id="carrier"
                onChange={handleChange}
                value={containerData.carrier}
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Customs house Agent</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Customs House Agent"
                id="customerHouseAgent"
                onChange={handleChange}
                value={containerData.customerHouseAgent}
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Currency"
                id="currency"
                onChange={handleChange}
                value={containerData.currency}
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Deposited Amount </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Deposited Amount"
                id="depositedAmount"
                onChange={handleChange}
                value={containerData.depositedAmount}
              />
            </Form.Group>

            <br />
          </Row>
          <br></br>
          <Col md={1} />
          <Row as={Col} md="5">
            <Button variant="success" type="submit" value="submit">
              Add
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ContainerDeposits;

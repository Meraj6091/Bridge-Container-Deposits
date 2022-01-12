import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
  Modal,
  Table,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Importer from "../Importer";
import Select from "../../Helpers/Select/select";
import {
  saveContainerDeposits,
  getContainerDeposits,
  deleteContainerDeposits,
  updateContainerDeposits,
  getEntities,
} from "./service";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { getDefaultValueForSelect } from "../../Helpers/Select/defaultValue";
const ContainerDeposits = () => {
  const [containerData, setContainerData] = useState({});
  const [loggedIn, setLoggedIn] = useState();
  const [show, setShow] = useState();
  const [onEdit, setonEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [onDelete, setOnDelete] = useState(false);

  useEffect(() => {
    getData();
    loadEntities();
  }, []);
  useEffect(() => {
    getData();
  }, [loading]);
  useEffect(() => {
    console.log(containerData);
    debugger;
  }, [containerData]);
  const handleClose = () => setShowModal(false);

  const handleSelectChange = (event) => {
    setContainerData({
      ...containerData,
      entity: event.value,
    });
  };
  const handleChange = (event) => {
    setContainerData({
      ...containerData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (onEdit) {
      await updateContainerDeposits(containerData);
    } else {
      await saveContainerDeposits(containerData);
    }
    setLoading(!loading);
  };

  const handleOnEdit = (data) => {
    debugger;
    setContainerData({
      ...containerData,
      ...data,
    });
    setonEdit(true);
  };
  const setDataByOnDelete = (data) => {
    setContainerData({
      ...containerData,
      ...data,
    });
    setShowModal(true);
  };
  const handleOnDelete = async () => {
    await deleteContainerDeposits(containerData);
    setShowModal(false);
    setLoading(!loading);
  };
  const getData = async () => {
    const { data } = await getContainerDeposits(containerData);
    if (data) {
      setTableData({
        ...tableData,
        data,
      });
    }
    console.log(tableData);
  };

  const loadEntities = async () => {
    const { data } = await getEntities(containerData);

    if (data) {
      setContainerData({
        ...containerData,
        data,
      });
    }
  };

  return (
    <>
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Container Deposits
        </h1>
        <br></br>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md="4" controlId="entity">
              <Form.Label>Entity</Form.Label>
              <Select
                value={getDefaultValueForSelect(containerData.entity)}
                options={containerData.data?.map((selector) => ({
                  label: selector.entity,
                  value: selector.entity,
                }))}
                onChange={(event) => handleSelectChange(event)}
              />
            </Form.Group>

            <Form.Group as={Col} md="4">
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
            <Form.Group as={Col} md="4">
              <Form.Label>B/L Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="blType"
                id="blType"
                onChange={handleChange}
                value={containerData.blType}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Bill of Landing Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bill of Landing Number"
                id="billOfLandingNo"
                onChange={handleChange}
                value={containerData.billOfLandingNo}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Shipment No</Form.Label>
              <Form.Control
                type="text"
                placeholder="Shipment No"
                id="shipmentNo"
                onChange={handleChange}
                value={containerData.shipmentNo}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Po Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Po Number"
                id="poNo"
                onChange={handleChange}
                value={containerData.poNo}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label> Client Po Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Po Number"
                id="clientPoNo"
                onChange={handleChange}
                value={containerData.clientPoNo}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Shipment Volume</Form.Label>
              <Form.Control
                type="text"
                placeholder="Shipment Volume"
                id="shipmentVol"
                onChange={handleChange}
                value={containerData.shipmentVol}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Carrier</Form.Label>
              <Form.Control
                type="text"
                placeholder="Carrier"
                id="carrier"
                onChange={handleChange}
                value={containerData.carrier}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
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
            <Form.Group as={Col} md="4">
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
            <Form.Group as={Col} md="4">
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
            <br></br>
            <Row as={Col} md="6" style={{ left: 10 }}>
              <Button variant="success btn-block" type="submit" value="submit">
                {onEdit ? "Update" : "Submit"}
              </Button>
            </Row>
          </Row>
        </Form>
      </Container>
      <br></br>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Entity</th>
              <th>Department</th>
              <th>B/L Type</th>
              <th>Bill of Landing No</th>
              <th>Shipment No</th>
              <th>Po No</th>
              <th>Client Po No</th>
              <th>Shipment Volume</th>
              <th>Carrier</th>
              <th>Customer House Agent</th>
              <th>Currency</th>
              <th>Deposited Amount </th>
            </tr>
          </thead>
          <tbody>
            {tableData.data &&
              tableData.data.map((data, key) => (
                <tr>
                  <td>{key}</td>
                  <td>{data.entity}</td>
                  <td>{data.department}</td>
                  <td>{data.blType}</td>
                  <td>{data.billOfLandingNo}</td>
                  <td>{data.shipmentNo}</td>
                  <td>{data.poNo}</td>
                  <td>{data.clientPoNo}</td>
                  <td>{data.shipmentVol}</td>
                  <td>{data.carrier}</td>
                  <td>{data.customerHouseAgent}</td>
                  <td>{data.currency}</td>
                  <td>{data.depositedAmount}</td>
                  <td>
                    {
                      <MdModeEditOutline
                        color="blue"
                        onClick={() => handleOnEdit(data)}
                      />
                    }
                    &nbsp; &nbsp; &nbsp;
                    {
                      <AiFillDelete
                        color="red"
                        onClick={() => setDataByOnDelete(data)}
                      />
                    }
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
      <>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>Are you sure want to Delete This!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleOnDelete()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default ContainerDeposits;

import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  FormControl,
  FormGroup,
  Row,
  Modal,
  Table,
  Card,
} from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContainerDepositsRecovery = ({ value }) => {
  const [containerData, setContainerData] = useState({});
  const [filterContainerData, setFilterContainerData] = useState({});
  const [onEdit, setonEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <>
      <div className="exfullwidth">
        <span>
          <b>Recovery Details</b>
        </span>
        <br></br>
        <br></br>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="chequeNo">
              <Form.Label>Cheque No</Form.Label>
              <Form.Control required type="text" placeholder="Cheque No" />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="date">
              <Form.Label>Received date</Form.Label>
              <Form.Control required type="date" placeholder="Received date" />
            </Form.Group>

            {/* Recovered Amount */}
            <Form.Group as={Col} md="4" controlId="refundAmount">
              <Form.Label>Refund Amount</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">{value}</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  //
                  required
                  placeholder="Refund Amount"
                  type="number"
                  pattern="^(\d+\.\d{1,6})$"
                  // defaultValue={getUnitPriceValue(props.data.recoveredAmount)}
                  // onChange={calculateUnrecoveredAmount}
                />
              </InputGroup>
            </Form.Group>
            {/*  */}

            {/* Exempted Tax Amount */}
            <Form.Group as={Col} md="4" controlId="deductAmount">
              <Form.Label>Deduct Amount</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">{value}</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  //
                  required
                  placeholder="Deduct Amount"
                  type="number"
                  pattern="^(\d+\.\d{1,6})$"
                  // defaultValue={getUnitPriceValue(props.data.exceptedTaxAmount)}
                  // onChange={props.onChange}
                />
              </InputGroup>
            </Form.Group>
            {/*  */}

            <Form.Group as={Col} md="4" controlId="reason">
              <Form.Label>Reason</Form.Label>
              <Form.Control required type="text" placeholder="Reason" />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="settleDate">
              <Form.Label>Settled date</Form.Label>
              <Form.Control required type="date" placeholder="Settled date" />
            </Form.Group>

            {/* Un-Recovered Amount */}
            <Form.Group as={Col} md="4" controlId="unRecoveredAmount">
              <Form.Label>Un-Recovered Amount</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">{value}</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  //
                  disabled
                  required
                  placeholder="Un-Recovered Amount"
                  type="number"
                  pattern="^(\d+\.\d{1,6})$"
                  // defaultValue={getUnitPriceValue(props.data.unRecoveredAmount)}
                  // onChange={props.onChange}
                />
              </InputGroup>
            </Form.Group>
            {/*  */}
          </Form.Row>
        </Form>
      </div>
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

export default ContainerDepositsRecovery;

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

const ContainerDepositsRecovery = ({
  value,
  containerData,
  setContainerData,
  depositedAmount,
}) => {
  const [filterContainerData, setFilterContainerData] = useState({});
  const [onEdit, setonEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleChange = (event) => {
    setContainerData({
      ...containerData,
      [event.target.id]: event.target.value,
    });
  };

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
              <Form.Control
                required
                type="text"
                placeholder="Cheque No"
                onChange={handleChange}
                value={containerData.chequeNo}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="receivedDate">
              <Form.Label>Received date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Received date"
                onChange={handleChange}
                value={containerData.receivedDate}
              />
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
                  onChange={handleChange}
                  value={containerData.refundAmount}
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
                  onChange={handleChange}
                  value={containerData.deductAmount}
                  // defaultValue={getUnitPriceValue(props.data.exceptedTaxAmount)}
                  // onChange={props.onChange}
                />
              </InputGroup>
            </Form.Group>
            {/*  */}

            <Form.Group as={Col} md="4" controlId="reason">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Reason"
                onChange={handleChange}
                value={containerData.reason}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="settleDate">
              <Form.Label>Settled date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Settled date"
                onChange={handleChange}
                value={containerData.settleDate}
              />
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
                  onChange={handleChange}
                  value={containerData.unRecoveredAmount}
                  // onChange={props.onChange}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    </>
  );
};

export default ContainerDepositsRecovery;

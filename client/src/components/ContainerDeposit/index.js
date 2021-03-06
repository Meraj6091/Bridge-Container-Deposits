import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Row,
  Modal,
  Table,
  Card,
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
  getFilterContainerDeposits,
} from "./service";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { getDefaultValueForSelect } from "../../Helpers/Select/defaultValue";
import NavBar from "../NavBar/index";
import { currencyCodes, filter, status, type } from "../../Helpers/currency";

import { RiFileExcel2Line } from "react-icons/ri";

import "react-toastify/dist/ReactToastify.css";
import ContainerDepositsRecovery from "./recovery";
import { exportToExcel } from "../../Helpers/exportToExcel";
import { openToast } from "../../Helpers/openToast";
import { ToastContainer } from "react-toastify";
import { FcDeleteDatabase } from "react-icons/fc";
import { async } from "exceljs/dist/exceljs";

const ContainerDeposits = () => {
  const [containerData, setContainerData] = useState({});
  const [filterContainerData, setFilterContainerData] = useState({});
  const [onEdit, setonEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentUser = localStorage.getItem("currentLoggedInUser");

  useEffect(() => {
    getData();
    loadEntities();
  }, []);
  useEffect(() => {
    getData();
  }, [loading]);
  useEffect(() => {
    console.log(containerData);
  }, [containerData]);
  const handleClose = () => setShowModal(false);

  const handleSelectChange = (event, id) => {
    setContainerData({
      ...containerData,
      [id]: event.value,
    });
  };

  const handleFilterSelectChange = (event, id) => {
    let findKey = filter.find((data) => data.label === event.value).key;
    setFilterContainerData({
      ...filterContainerData,
      [id]: findKey,
      label: event.value,
    });
  };

  const handleChange = (event) => {
    setContainerData({
      ...containerData,
      [event.target.id]: event.target.value,
    });
  };

  let max =
    parseInt(containerData.depositedAmount) +
    parseInt(containerData.refundAmount);

  const handleSubmit = async (event) => {
    setSubmitted(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setSubmitted(false);
      return;
    }
    event.preventDefault();

    let postData = containerData;
    let unRecoveredAmount;

    try {
      if (onEdit) {
        const date = new Date();
        postData.updatedBy = currentUser;
        postData.updatedDate = date;
        if (
          containerData.depositedAmount &&
          containerData.refundAmount &&
          containerData.deductAmount
        ) {
          unRecoveredAmount =
            parseInt(containerData.depositedAmount) +
            parseInt(containerData.refundAmount) -
            parseInt(containerData.deductAmount);

          postData.unRecoveredAmount = unRecoveredAmount;

          console.log(unRecoveredAmount);
        }

        // if (
        //   containerData.deductAmount &&
        //   containerData.unRecoveredAmount &&
        //   parseInt(containerData.deductAmount) > max
        // )
        // openToast("warn", "Check The Deduct Amount Again");

        await updateContainerDeposits(postData);
      } else {
        postData.createdBy = currentUser;
        const { data } = await saveContainerDeposits(postData);
        if (data._id) {
          setContainerData({
            ...containerData,
            uuid: data._id,
          });
        }

        setonEdit(true);
      }
      setLoading(!loading);

      openToast(
        "success",
        onEdit ? "Updated Successfully" : "Created Successfully"
      );

      setValidated(false);
      setSubmitted(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnEdit = async (data) => {
    await setContainerData({
      chequeNo: "",
      receivedDate: "",
      refundAmount: "",
      deductAmount: "",
      reason: "",
      settleDate: "",
      unRecoveredAmount: "",
    });
    setContainerData({
      ...data,
    });
    setonEdit(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const setDataByOnDelete = (data) => {
    setContainerData({
      ...containerData,
      id: data._id,
    });
    setShowModal(true);
  };
  const handleOnDelete = async () => {
    const postData = containerData;
    postData.deletedBy = currentUser;
    await deleteContainerDeposits(postData);
    setShowModal(false);
    setLoading(!loading);
    openToast("success", "Deleted Successfully");
  };

  const handleOnSearch = async (event) => {
    event.preventDefault();
    console.log(filterContainerData);
    const { data } = await getFilterContainerDeposits(filterContainerData);
    if (data) {
      setTableData({
        data,
      });
    }
  };

  const handleSearch = async (event) => {
    setFilterContainerData({
      ...filterContainerData,
      [event.target.id]: event.target.value,
    });

    // let value = event.target.value.toLowerCase();
    // const { data } = await getContainerDeposits(containerData);

    // let filtered = [];

    // // update search value
    // // setSearchValue(searchTerm);

    // filtered = data.filter((product) => product.blType.search(value) != -1);

    // // set filtered products in state
    // setFilteredProducts(filtered);
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
  const handleReset = () => {
    setLoading(!loading);
    setFilterContainerData({ value: "", select: "" });
  };

  const exportToCSV = () => {
    console.log(tableData.data);
    let filteredArr = tableData.data?.filter(function (el) {
      return el.isDeleted === false;
    });
    const newArrayOfObj = filteredArr.map(
      ({
        billOfLandingNo: BillofLandingNumber,
        blType: BLType,
        carrier: Carrier,
        clientPoNo: ClientPoNumber,
        currency: Currency,
        customerHouseAgent: CustomerHouseAgent,
        depositedAmount: DepositedAmount,
        entity: Entity,
        poNo: PoNumber,
        shipmentNo: ShipmentNo,
        shipmentVol: ShipmentVol,
        department: department,
        chequeNo: ChequeNo,
        deductAmount: DeductAmount,
        reason: Reason,
        receivedDate: ReceivedDate,
        refundAmount: RefundAmount,
        settleDate: SettleDate,
        unRecoveredAmount: UnRecoveredAmount,
        ataDate: ATADate,
        docReceivedDate: DocumentReceivedDate,
        docSubmittedDate: DocumentSubmittedDate,
        remarks: Remarks,
        status: Status,
        __v: __v,
        _id: _id,
        ...rest
      }) => ({
        Entity,
        BLType,
        BillofLandingNumber,
        ClientPoNumber,
        ShipmentVol,
        Carrier,
        DepositedAmount,
        Currency,
        CustomerHouseAgent,
        PoNumber,
        ShipmentNo,
        ChequeNo,
        DeductAmount,
        Reason,
        ReceivedDate,
        RefundAmount,
        SettleDate,
        UnRecoveredAmount,
        ATADate,
        DocumentReceivedDate,
        DocumentSubmittedDate,
        Remarks,
        Status,
        ...rest,
      })
    );

    exportToExcel(newArrayOfObj, "Container Deposits");
  };
  return (
    <>
      <NavBar />

      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Container Deposits
        </h1>
        <br></br>
        <Card>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>Entity</Form.Label>
                  <Select
                    value={getDefaultValueForSelect(containerData.entity)}
                    options={containerData.data?.map((selector) => ({
                      label: selector.entity,
                      value: selector.entity,
                    }))}
                    onChange={(event) => handleSelectChange(event, "entity")}
                  />
                </Form.Group>

                {/* <Form.Group as={Col} md="4">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Department"
                    id="department"
                    onChange={handleChange}
                    value={containerData.department}
                  />
                </Form.Group> */}
                <Form.Group as={Col} md="4">
                  <Form.Label>B/L Type</Form.Label>
                  <Select
                    value={getDefaultValueForSelect(containerData.blType)}
                    options={type.map((selector) => ({
                      label: selector,
                      value: selector,
                    }))}
                    onChange={(event) => handleSelectChange(event, "blType")}
                  />
                  {/* <Form.Control
                    type="text"
                    placeholder="blType"
                    id="blType"
                    onChange={handleChange}
                    value={containerData.blType}
                  /> */}
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
                <Form.Group as={Col} md="4" controlId="ataDate">
                  <Form.Label>ATA date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="ATA date"
                    onChange={handleChange}
                    value={containerData.ataDate}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="docReceivedDate">
                  <Form.Label>Docs Received date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="Docs Received  date"
                    onChange={handleChange}
                    value={containerData.docReceivedDate}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="docSubmittedDate">
                  <Form.Label>Docs Submitted date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="Docs Submitted  date"
                    onChange={handleChange}
                    value={containerData.docSubmittedDate}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Currency</Form.Label>
                  <Select
                    value={getDefaultValueForSelect(containerData.currency)}
                    options={currencyCodes.map((selector) => ({
                      label: selector,
                      value: selector,
                    }))}
                    onChange={(event) => handleSelectChange(event, "currency")}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="depositedAmount">
                  <Form.Label> Deposit Amount</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        {containerData.currency}
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      //
                      required
                      placeholder="Deposit Amount"
                      type="number"
                      pattern="^(\d+\.\d{1,6})$"
                      // defaultValue={getUnitPriceValue(props.data.recoveredAmount)}
                      // onChange={calculateUnrecoveredAmount}
                      onChange={handleChange}
                      value={containerData.depositedAmount}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Status</Form.Label>
                  <Select
                    value={getDefaultValueForSelect(containerData.status)}
                    options={status.map((selector) => ({
                      label: selector,
                      value: selector,
                    }))}
                    onChange={(event) => handleSelectChange(event, "status")}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="remarks">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Remarks"
                    onChange={handleChange}
                    value={containerData.remarks}
                  />
                </Form.Group>
                <br></br>
                {onEdit && (
                  <>
                    <Card>
                      <Card.Body>
                        {/* <ContainerDepositsRecovery
                          value={containerData.currency}
                          containerData={containerData}
                          setContainerData={setContainerData}
                        /> */}
                        <div className="exfullwidth">
                          <span>
                            <b>Recovery Details</b>
                          </span>
                          <br></br>
                          <br></br>

                          <Form.Row>
                            <Form.Group as={Col} md="4" controlId="chequeNo">
                              <Form.Label>Cheque No</Form.Label>
                              <Form.Control
                                required
                                type="number"
                                placeholder="Cheque No"
                                onChange={handleChange}
                                value={containerData.chequeNo}
                              />
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="receivedDate"
                            >
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
                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="refundAmount"
                            >
                              <Form.Label>Refund Amount</Form.Label>
                              <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                  <InputGroup.Text id="basic-addon1">
                                    {containerData.currency}
                                  </InputGroup.Text>
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
                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="deductAmount"
                            >
                              <Form.Label>Deduct Amount</Form.Label>
                              <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                  <InputGroup.Text id="basic-addon1">
                                    {containerData.currency}
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                  //
                                  required
                                  placeholder="Deduct Amount"
                                  type="number"
                                  pattern="^(\d+\.\d{1,6})$"
                                  max={max}
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
                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="unRecoveredAmount"
                            >
                              <Form.Label>Un-Recovered Amount</Form.Label>
                              <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                  <InputGroup.Text id="basic-addon1">
                                    {containerData.currency}
                                  </InputGroup.Text>
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
                        </div>
                      </Card.Body>
                    </Card>
                  </>
                )}
              </Row>
              <br></br>
              <Row as={Col} md="6" style={{ left: 10 }}>
                <Button
                  variant="success btn-block"
                  type="submit"
                  value="submit"
                  disabled={submitted}
                >
                  {onEdit ? "Update" : "Submit"}
                </Button>
                &nbsp;
                {onEdit && (
                  <div style={{ paddingLeft: 10 }}>
                    <Button
                      variant="success btn-block"
                      type="submit"
                      value="submit"
                      onClick={() => window.location.reload()}
                    >
                      Add New
                    </Button>
                  </div>
                )}
                &nbsp;&nbsp;
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <br></br>
      <Container>
        <Card>
          <Card.Body>
            <Row as={Col} md="4" style={{ left: 10 }}>
              <Select
                value={getDefaultValueForSelect(filterContainerData.label)}
                options={filter.map((selector) => ({
                  label: selector.label,
                  value: selector.label,
                }))}
                onChange={(event) => handleFilterSelectChange(event, "select")}
              />
              &nbsp;&nbsp;&nbsp;
              <FormControl
                id="value"
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={filterContainerData.value}
                onChange={(event) => handleSearch(event)}
              />
              <Row as={Col} md="2" style={{ left: 10 }}>
                <Button style={{ marginLeft: 350 }} onClick={exportToCSV}>
                  <RiFileExcel2Line /> &nbsp;Export
                </Button>
              </Row>
            </Row>
            <br></br>
            &nbsp;&nbsp;
            <Button variant="outline-success" onClick={handleOnSearch}>
              Search
            </Button>
            &nbsp;&nbsp;
            <Button variant="outline-success" onClick={handleReset}>
              Reset
            </Button>
            <br></br>
            <br></br>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Entity</th>
                  {/* <th>Department</th> */}
                  <th>B/L Type</th>
                  <th>Bill of Landing No</th>
                  {/* <th>Shipment No</th> */}

                  <th>Client Po No</th>
                  <th>Shipment Volume</th>
                  <th>Carrier</th>

                  {/* <th>Currency</th> */}
                  <th>Deposited Amount </th>
                  <th>Status</th>
                  <th>Action </th>
                </tr>
              </thead>
              <tbody>
                {tableData.data &&
                  tableData.data.map((data, key) => (
                    <tr>
                      <td>{key + 1}</td>
                      <td>{data.entity}</td>
                      {/* <td>{data.department}</td> */}
                      <td>{data.blType}</td>
                      <td>{data.billOfLandingNo}</td>
                      {/* <td>{data.shipmentNo}</td> */}

                      <td>{data.clientPoNo}</td>
                      <td>{data.shipmentVol}</td>
                      <td>{data.carrier}</td>
                      {/* <td>{data.customerHouseAgent}</td> */}
                      {/* <td>{data.currency}</td> */}
                      <td>{data.depositedAmount}</td>
                      <td>{data.status}</td>
                      {data.isDeleted === false ? (
                        <td>
                          {
                            <MdModeEditOutline
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Edit"
                              color="blue"
                              onClick={() => handleOnEdit(data)}
                            />
                          }
                          &nbsp; &nbsp; &nbsp;
                          {
                            <AiFillDelete
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Delete"
                              color="red"
                              onClick={() => setDataByOnDelete(data)}
                            />
                          }
                        </td>
                      ) : (
                        <td>
                          {
                            <FcDeleteDatabase
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Deleted"
                              color="red"
                            />
                          }
                        </td>
                      )}
                    </tr>
                  ))}
                {filteredProducts.map((value, index) => {
                  return <div>{value.blType}</div>;
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      <>
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <h6>Are you sure want to Delete This!</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={() => handleOnDelete()}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
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

export default ContainerDeposits;

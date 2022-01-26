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
  Card,
  Table,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../NavBar";
import {
  importer,
  getImporter,
  updateImporter,
  deleteImporter,
} from "./service/index";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FcDeleteDatabase } from "react-icons/fc";
import { openToast } from "../../Helpers/openToast";
import { ToastContainer } from "react-toastify";

function Importer() {
  let history = useHistory();
  const [importerData, setImporterData] = useState({});
  const [tableData, setTableData] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onEdit, setonEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const handleClose = () => setShowModal(false);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const currentUser = localStorage.getItem("currentLoggedInUser");

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [loading]);

  useEffect(() => {
    if (onEdit === false) {
      setImporterData({
        importerName: "",
        entity: "",
      });
    }
  }, [onEdit]);

  const handleChange = (event) => {
    setImporterData({
      ...importerData,
      [event.target.id]: event.target.value,
    });
  };
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

    let postData = importerData;
    if (onEdit) {
      const date = new Date();
      postData.updatedBy = currentUser;
      postData.updatedDate = date;
      await updateImporter(postData);
      openToast("success", "Updated Successfully");
    } else {
      let filteredArr = tableData.data?.filter(function (el) {
        return el.isDeleted === false;
      });

      if (
        filteredArr.some(
          (data) =>
            data.importerName === importerData.importerName &&
            data.entity === importerData.entity
        )
      ) {
        openToast("warn", "There Cant be same Entities for Same Importer Name");

        // alert("There Cant be same Entities for Same Importer Name");
      } else {
        postData.createdBy = currentUser;
        await importer(postData);
        setImporterData({
          importerName: "",
          entity: "",
        });
        openToast("success", "Created Successfully");
      }
    }
    setSubmitted(false);
    setValidated(false);
    setLoading(!loading);
  };

  const handleOnEdit = (data) => {
    setImporterData({
      ...data,
    });
    setonEdit(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setDataByOnDelete = (data) => {
    setImporterData({
      ...importerData,
      id: data._id,
    });
    setShowModal(true);
  };
  const handleOnDelete = async () => {
    let postData = importerData;
    postData.deletedBy = currentUser;
    await deleteImporter(postData);
    setShowModal(false);
    setLoading(!loading);
    setImporterData({
      importerName: "",
      entity: "",
    });
    openToast("success", "Deleted Successfully");
  };
  const getData = async () => {
    const { data } = await getImporter(importerData);
    if (data) {
      debugger;
      setTableData({
        ...tableData,
        data,
      });
    }
    console.log(tableData);
  };

  return (
    <>
      <NavBar />
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Importers
        </h1>

        <div>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <FormGroup controlId="Importer Name">
              <Col sm={5}>Importer Name</Col>
              <Col sm={3}>
                <FormControl
                  type="text"
                  id="importerName"
                  placeholder="Importer Name"
                  onChange={handleChange}
                  value={importerData.importerName}
                  required
                />
                {/* <Button
                style={{ marginTop: 14 }}
                variant="success btn-block"
                type="submit"
                value="submit"
                disabled={!importerData.importerName}
              >
                Add
              </Button> */}
              </Col>
            </FormGroup>
            <FormGroup controlId="entity">
              <Col sm={5}>Entity</Col>
              <Col sm={3}>
                <FormControl
                  type="text"
                  id="entity"
                  placeholder="Entity"
                  onChange={handleChange}
                  value={importerData.entity}
                  required
                />
                <Button
                  style={{ marginTop: 14 }}
                  variant="success btn-block"
                  type="submit"
                  value="submit"
                  disabled={submitted}
                >
                  {onEdit ? "Update" : "Submit"}
                </Button>
                &nbsp;
                {onEdit && (
                  <div>
                    <Button
                      variant="success btn-block"
                      type="submit"
                      value="submit"
                      onClick={() => setonEdit(false)}
                    >
                      Add New
                    </Button>
                  </div>
                )}
              </Col>
            </FormGroup>
          </Form>
          <Card>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Importer Name</th>
                    <th>Entity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.data &&
                    tableData.data.map((data, key) => (
                      <tr
                      // style={
                      //   data.isDeleted ? { backgroundColor: "lightGray" } : {}
                      // }
                      >
                        <td>{key + 1}</td>
                        <td>{data.importerName}</td>
                        <td>{data.entity}</td>
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
                </tbody>
              </Table>
            </Card.Body>
          </Card>
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
        </div>
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
}

export default Importer;

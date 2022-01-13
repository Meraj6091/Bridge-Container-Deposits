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

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [loading]);

  const handleChange = (event) => {
    setImporterData({
      ...importerData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (onEdit) {
      await updateImporter(importerData);
    } else {
      await importer(importerData);
    }
    setLoading(!loading);
  };

  const handleOnEdit = (data) => {
    debugger;
    setImporterData({
      ...importerData,
      ...data,
    });
    setonEdit(true);
  };
  const setDataByOnDelete = (data) => {
    setImporterData({
      ...importerData,
      ...data,
    });
    setShowModal(true);
  };
  const handleOnDelete = async () => {
    await deleteImporter(importerData);
    setShowModal(false);
    setLoading(!loading);
  };
  const getData = async () => {
    const { data } = await getImporter(importerData);
    if (data) {
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
        <Form onSubmit={(e) => setShow(true, e.preventDefault())}>
          <FormGroup controlId="Importer Name">
            <Col sm={5}>Importer Name</Col>
            <Col sm={3}>
              <FormControl
                type="text"
                id="importerName"
                placeholder="Importer Name"
                onChange={handleChange}
                value={importerData.importerName}
              />
              <Button
                style={{ marginTop: 14 }}
                variant="success btn-block"
                type="submit"
                value="submit"
                disabled={!importerData.importerName}
              >
                Add
              </Button>
            </Col>
          </FormGroup>
        </Form>
        {show && (
          <div>
            <Form onSubmit={handleSubmit}>
              <FormGroup controlId="entity">
                <Col sm={5}>Entity</Col>
                <Col sm={3}>
                  <FormControl
                    type="text"
                    id="entity"
                    placeholder="Entity"
                    onChange={handleChange}
                    value={importerData.entity}
                  />
                  <Button
                    style={{ marginTop: 14 }}
                    variant="success btn-block"
                    type="submit"
                    value="submit"
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
                        <tr>
                          <td>{key}</td>
                          <td>{data.importerName}</td>
                          <td>{data.entity}</td>
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
        )}
      </Container>
    </>
  );
}

export default Importer;

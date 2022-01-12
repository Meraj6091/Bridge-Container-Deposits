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
import { importer, getImporter } from "./service/index";
function Importer() {
  let history = useHistory();
  const [importerData, setImporterData] = useState({});
  const [tableData, setTableData] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const { data } = await importer(importerData);
    setLoading(!loading);
  };

  const handleOnEdit = (data) => {};
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
    <div>
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
                    type="submit"
                    value="submit"
                  >
                    Add
                  </Button>
                </Col>
              </FormGroup>
            </Form>

            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Importer Name</th>
                  <th>Entity</th>
                </tr>
              </thead>
              <tbody>
                {tableData.data &&
                  tableData.data.map((data, key) => (
                    <tr>
                      <td>{key}</td>
                      <td>{data.importerName}</td>
                      <td>{data.entity}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Importer;

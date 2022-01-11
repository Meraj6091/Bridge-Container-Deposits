import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";

function Importer() {
  const [importerData, setImporterData] = useState({});
  const handleChange = (event) => {
    setImporterData({
      ...importerData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log();
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
            <Button type="submit" value="submit" style={{ marginTop: 14 }}>
              Add
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default Importer;

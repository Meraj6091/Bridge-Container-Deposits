import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
function Entity() {
  const [entity, setEntity] = useState({});
  const handleChange = (event) => {
    setEntity({
      ...entity,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(entity);
  };
  return (
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
              value={entity.entity}
            />
            <Button style={{ marginTop: 14 }} type="submit" value="submit">
              Add
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default Entity;

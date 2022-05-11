import React, { useState } from "react";

import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { ToggleButton } from "react-bootstrap";

import "./index.css";

export function RouteCard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [checked, setChecked] = useState(false);

  return (
    <div id={props.route.id} className="card-container">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{props.route.route_title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.route.post_date}
          </Card.Subtitle>
          <Card.Text>Distance: {props.route.distance}</Card.Text>
          <Card.Text>Duration: {props.route.duration}</Card.Text>
          <div className="btn-container">
            <Button disabled={!checked} variant="primary" onClick={handleShow}>
              Post the route
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <input
              type="checkbox"
              onChange={() => setChecked(!checked)}
              checked={checked}
              id=""
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

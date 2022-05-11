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
  const [checked, setChecked] = useState(props.route.completed);

  async function handleChange() {
    let response = await fetch(
      `http://127.0.0.1:8000/route/update/${props.route.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status == "204") {
      setChecked(!checked);
      props.handleCheck(props.route);
    } else {
      alert("Error making the request");
    }
  }

  async function handleDelete() {
    let response = await fetch(
      `http://127.0.0.1:8000/route/delete/${props.route.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status == "200") {
      props.handleDelete(props.route);
    } else {
      alert("Error making the request");
    }
  }

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
            <Button variant="danger" onClick={handleDelete}>
              Delete
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
              onChange={handleChange}
              checked={checked}
              id=""
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

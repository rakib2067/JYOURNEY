import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ToggleButton } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./index.css";

export function Account() {
  const [routes, setRoutes] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getRoutes();
  }, []);
  // test
  async function getRoutes() {
    const resp = await fetch("http://localhost:8000/route/", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    const data = await resp.json();
    setRoutes(data);
    console.log(data);
  }

  function Checkbox() {
    const [checked, setChecked] = useState(false);

    return (
      <>
        <ToggleButton
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={checked}
          value="1"
          onChange={(e) => setChecked(e.currentTarget.checked)}
        >
          Completed
        </ToggleButton>
      </>
    );
  }

  return (
    <>
      <h1 fontSize="6xl"> My Journeys</h1>
      {routes &&
        routes.map((route) => (
          <>
            <div className="card-container">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{route.route_title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {route.post_date}
                  </Card.Subtitle>
                  <Card.Text>Distance: {route.distance}</Card.Text>
                  <Card.Text>Duration: {route.duration}</Card.Text>
                  <div className="btn-container">
                    <Button variant="primary" onClick={handleShow}>
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

                    <Checkbox />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </>
        ))}
    </>
  );
}

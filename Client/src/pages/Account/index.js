import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ToggleButton } from "react-bootstrap";

import "./index.css"

export function Account() {
  let [routes, setRoutes] = useState();
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
      {routes && routes.map((route) =>
        <>
          <div className="card-container">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{route.route_title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{route.post_date}</Card.Subtitle>
                <div className="btn-container">
                  <Button variant="primary">Post the route</Button>
                  <Checkbox />
                </div>
              </Card.Body>
            </Card>
          </div>
        </>
      )}

    </>
  );
}



import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
export function Welcome() {
  const goTo = useNavigate();
  return (
    <Container>
      <h1 className="text-center my-3">Sign In Page</h1>
      <Row className="mx-0">
        <Button onClick={() => goTo("/home")} as={Col} variant="primary">
          Sign Up
        </Button>
        <Button
          onClick={() => goTo("/login")}
          as={Col}
          variant="secondary"
          className="mx-2"
        >
          Login
        </Button>
      </Row>
    </Container>
  );
}

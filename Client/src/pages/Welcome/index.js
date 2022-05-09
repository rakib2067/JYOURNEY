import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
export function Welcome() {
  return (
    <Container>
      <h1 className="text-center my-3">Sign In Page</h1>
      <Row className="mx-0">
        <Button as={Col} variant="primary">
          Sign Up
        </Button>
        <Button as={Col} variant="secondary" className="mx-2">
          Login
        </Button>
      </Row>
    </Container>
  );
}

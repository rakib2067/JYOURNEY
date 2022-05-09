import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image'
import "./index.css"

export function Welcome() {
  return (
    <div className="background-image">
      <Container>
        <div className="logo-cont">
          <Image className="logo" src="https://i.ibb.co/Z1K8z2n/Aurora-1-removebg-preview-1.png"/>

        </div>

        <Row className="mx-0">
          <Button as={Col} variant="primary btn-width btn-blue">
            Sign Up
          </Button>
          <Button as={Col} variant="secondary" className="mx-2 btn-width btn-green">
            Login
          </Button>
        </Row>
      </Container>
    </div>
  );
}

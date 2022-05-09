import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from  "react-bootstrap/Col";
import Container from  "react-bootstrap/Container";
const SignIn = () => {
  return (<Container>
    <h1 className="text-center">Sign In Page</h1>
    <Row className="mx-0">
    <Button as={Col} variant="primary">Sign Up</Button>
    <Button as={Col} variant="secondary" className="mx-2">Login</Button>
  </Row>
  </Container>)

};

export default SignIn;

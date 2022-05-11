import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./index.css";

export function Posts() {
  let [posts, setPosts] = useState();
  // let [comments, setComments] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const resp = await fetch("http://localhost:8000/feed/", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    const data = await resp.json();
    setPosts(data);
    console.log(data);
  }

  return (
    <>
      {posts &&
        posts.map((post) => (
          <section className="card-container">
            
            <Card style={{ width: '18rem' }}>
              
              <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
              src={require("../../img/logo_black.png").default}
              <Card.Body>
                  <Card.Title>{`Title: ${post.title}`}</Card.Title>
                  <Card.Text>
                  {`Description: ${post.description}`}
                  </Card.Text>
              </Card.Body>

              <ListGroup className="list-group-flush">
                  <ListGroupItem>{`Poster name: ${post.poster_name}`}</ListGroupItem>
                  <ListGroupItem>{`Route: ${post.route}`}</ListGroupItem>
                  <ListGroupItem>{`Likes: ${post.likes_count}`}</ListGroupItem>
                  <ListGroupItem>{`Post date: ${post.post_date}`}</ListGroupItem>
              </ListGroup>

              <Card.Body>
                <Card.Link href="#" onClick={handleShow}>Add a Comment</Card.Link>

                
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="username"
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



                <Card.Link href="#">View Comments</Card.Link>
              </Card.Body>

            </Card>
                 
          </section>

        ))}
    </>
  );
}

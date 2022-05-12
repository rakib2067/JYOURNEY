import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas'
import OffcanvasHeader from 'react-bootstrap/OffcanvasHeader'
import OffcanvasTitle from 'react-bootstrap/OffcanvasTitle'
import OffcanvasBody from 'react-bootstrap/OffcanvasBody'
import {Badge} from 'react-bootstrap'
import "./index.css";
// import Heart from "react-animated-heart";

export function Posts({}) {
  let [posts, setPosts] = useState();
  // let [comments, setComments] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 // like count
 const [ likesCount, setlikesCount ] = useState(0);
 const increaseLIkesCount = () => setlikesCount(prev => prev + 1);


  // view comment handlers
  // https://react-bootstrap.github.io/components/offcanvas/
  const [viewCanvas, setViewCanvas] = useState(false);

  const handleCommentClose = () => setViewCanvas(false);
  const handleViewCanvas = () => setViewCanvas(true);


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
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
              src={require("../../img/logo_black.png").default}
              <Card.Body>
                <Card.Title>{`Title: ${post.title}`}</Card.Title>
                <Card.Text>{`Description: ${post.description}`}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{`Poster name: ${post.poster_name}`}</ListGroupItem>
                <ListGroupItem>{`Route: ${post.route}`}</ListGroupItem>
                                
                {/* <ListGroupItem>{`Likes: ${post.likes_count}`}</ListGroupItem> */}
                {/********* like button *********/}
                {/* <ListGroupItem> <Badge pill bg="primary" onClick={increaseLIkesCount}>Like </Badge> {likesCount}</ListGroupItem> */}

                <ListGroupItem> <Badge pill bg="light" onClick={increaseLIkesCount}> <span className="like-btn"> &#9829;</span></Badge> {likesCount}</ListGroupItem>

                



                <ListGroupItem>{`Post date: ${post.post_date}`}</ListGroupItem>
              </ListGroup>
              <Card.Body/>
              <Button variant="warning" onClick={handleShow}>
                  Add Comments
              </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Comment Entry</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        {/* <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="username"
                          autoFocus
                        /> */}
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Write your comment below:</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                       Post Comment {/* this should send the comment to the db (based on the poster_name(username)?!) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                    </Button>
                  </Modal.Footer>
                </Modal>

            

                <Button variant="primary" onClick={handleViewCanvas}>
                   View Comments
                </Button>
                <Offcanvas show={viewCanvas} onHide={handleCommentClose} >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>All comments for this post:</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    Username: Comment 
                    {/* {comment.comment.all} */}
                    {/* 
                    
                    this should get all the comments by user from the db based on post id ordered by id !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
                    e.g.
                    username_id1 : comment_id1
                    username_id2 : comment_id2
                    username_id2 : comment_id3
                    username_id3 : comment_id4
                    */}
                  </Offcanvas.Body>
                </Offcanvas>
              <Card.Body/>
            </Card>
          </section>
        ))}
    </>
  );
}

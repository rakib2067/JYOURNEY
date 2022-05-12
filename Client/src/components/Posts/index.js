import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import OffcanvasHeader from "react-bootstrap/OffcanvasHeader";
import OffcanvasTitle from "react-bootstrap/OffcanvasTitle";
import OffcanvasBody from "react-bootstrap/OffcanvasBody";
import { Badge } from "react-bootstrap";
import "./index.css";
import { useNavigate } from "react-router-dom";
// import Heart from "react-animated-heart";

export function Posts({}) {
  let [posts, setPosts] = useState();
  // let [comments, setComments] = useState();
  let [commentTitle, setCommentTitle] = useState();
  let [commentDescription, setCommentDescription] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleTitle(e) {
    setCommentTitle(e.target.value);
  }
  function handleDesc(e) {
    setCommentDescription(e.target.value);
  }
  async function handleCommentsClose(post) {
    let data = {
      title: commentTitle,
      body: commentDescription,
      post: post.id,
    };
    const resp = await fetch(`http://localhost:8000/feed/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    if (resp.status == "201") {
      post.comments.push({ ...data });
      setShow(false);
    }
  }
  // like count
  const [likesCount, setlikesCount] = useState(0);

  const increaseLIkesCount = async (post) => {
    console.log("POST", post);
    let data = {
      title: post.title,
      post_url: post.post_url,
    };
    console.log(data);
    const resp = await fetch(`http://127.0.0.1:8000/feed/like/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    console.log(resp);
    const respData = await resp.json();

    if (resp.status == "200") {
      const newArray = [...posts];
      console.log(newArray);
      let newPost = newArray.find((p) => p.id == post.id);
      if (post.liked) {
        newPost.likes_count = newPost.likes_count - 1;
        newPost.liked = false;
      } else {
        newPost.likes_count = newPost.likes_count + 1;
        newPost.liked = true;
      }
      setPosts((prev) => newArray);
    } else {
      alert("error making request");
    }
  };

  // view comment handlers
  // https://react-bootstrap.github.io/components/offcanvas/
  const [viewCanvas, setViewCanvas] = useState(false);
  const goTo = useNavigate();
  const handleCommentClose = () => setViewCanvas(false);
  const handleViewCanvas = () => setViewCanvas(true);

  useEffect(() => {
    getPosts();
  }, []);

  // Destructures the post object and stores destination points to localstorage
  function goToRoute({ startLat, startLong, destLat, destLong }) {
    localStorage.setItem("startLat", startLat);
    localStorage.setItem("startLong", startLong);
    localStorage.setItem("destLat", destLat);
    localStorage.setItem("destLong", destLong);
    goTo("/");
  }
  async function getPosts() {
    const resp = await fetch("http://localhost:8000/feed/", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    const data = await resp.json();

    data.forEach(async (post) => {
      const commentResp = await fetch(`http://localhost:8000/feed/${post.id}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      const commentData = await commentResp.json();
      post.comments = commentData;
      console.log(commentData);
    });

    setPosts(data);
  }

  return (
    <>
      {posts &&
        posts.map((post) => (
          <section className="card-container">
            <Card style={{ width: "18rem" }}>
              <Card.Img className="postImg" variant="top" src={post.post_url} />
              <Card.Body>
                <Card.Title>{`Title: ${post.title}`}</Card.Title>
                <Card.Text>{`Description: ${post.description}`}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{`Poster name: ${post.poster_name}`}</ListGroupItem>
                <ListGroupItem>{`Route: ${post.route}`}</ListGroupItem>
                <ListGroupItem>
                  {" "}
                  <Badge
                    pill
                    style={{ cursor: "pointer" }}
                    bg="light"
                    onClick={() => {
                      increaseLIkesCount(post);
                    }}
                  >
                    {" "}
                    <span className="like-btn"> &#9829;</span>
                  </Badge>{" "}
                  {post.likes_count}
                </ListGroupItem>
                <ListGroupItem>{`Post date: ${post.post_date}`}</ListGroupItem>
              </ListGroup>
              <Card.Body />
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
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Write your comment below:</Form.Label>
                      <Form.Control
                        value={commentTitle}
                        onChange={handleTitle}
                        as="textarea"
                        rows={3}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Write your comment below:</Form.Label>
                      <Form.Control
                        value={commentDescription}
                        onChange={handleDesc}
                        as="textarea"
                        rows={3}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleCommentsClose(post)}
                  >
                    Post Comment{" "}
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button variant="primary" onClick={handleViewCanvas}>
                View Comments
              </Button>
              <Button variant="info" onClick={() => goToRoute(post)}>
                Go To Route
              </Button>
              <Offcanvas show={viewCanvas} onHide={handleCommentClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>All comments for this post:</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {post.comments &&
                    post.comments.map((comment) => {
                      return (
                        <div className="comment">
                          <p className="commentTitle">{comment.poster_name}</p>
                          <p>{comment.body}</p>
                          <p className="commentDate">
                            Posted At:{" "}
                            {comment.date_added.substring(
                              0,
                              comment.date_added.indexOf("T")
                            )}
                          </p>
                        </div>
                      );
                    })}
                </Offcanvas.Body>
              </Offcanvas>
              <Card.Body />
            </Card>
          </section>
        ))}
    </>
  );
}

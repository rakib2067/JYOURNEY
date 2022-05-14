import React, { useState } from "react";

import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { ToggleButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./index.css";

export function RouteCard(props) {
  const [show, setShow] = useState(false);

  const [postTitle, setPostTitle] = useState();
  const [postDesc, setPostDesc] = useState();

  const goTo = useNavigate();

  function postTitleHandler(e) {
    setPostTitle(e.target.value);
  }
  function postDescHandler(e) {
    setPostDesc(e.target.value);
  }

  const handleShow = () => setShow(true);
  const [checked, setChecked] = useState(props.route.completed);

  const [image, setImage] = useState();
  const storage = getStorage();

  const handleClose = async () => {
    if (image == null) {
      return alert("Error uploading");
    }
    let imageUrl;
    const postsRef = ref(
      storage,
      `Posts/${(Math.random() + 1).toString(36).substring(7)}`
    );
    uploadBytes(postsRef, image)
      .then((snapshot) => {
        console.log("post uploaded");
        return getDownloadURL(snapshot.ref);
      })
      .then(async (downloadUrl) => {
        console.log("Download URL", downloadUrl);
        imageUrl = downloadUrl;
        let data = {
          title: postTitle,
          description: postDesc,
          route: props.route.id,
          post_url: imageUrl,
        };

        console.log(data);
        let response = await fetch(
          `https://jyourney.herokuapp.com/feed/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
          }
        );
        if (response.status == "201") {
          setShow(false);
          goTo("/feed");
        } else {
          alert("Error creating post!");
        }
      });
  };
  function handleCloseButton() {
    setShow(false);
  }
  async function handleChange() {
    let response = await fetch(
      `https://jyourney.herokuapp.com/route/update/${props.route.id}`,
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
      `https://jyourney.herokuapp.com/route/delete/${props.route.id}`,
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

            <Modal
              show={show}
              onHide={() => {
                setShow(false);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Post your Route</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={postTitleHandler}
                      placeholder="Enter a title for your post..."
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Post Description</Form.Label>
                    <Form.Control
                      onChange={postDescHandler}
                      as="textarea"
                      placeholder="Enter a description for your post..."
                      rows={3}
                    />
                  </Form.Group>
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Create Post
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

import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import "./index.css";

export function Posts() {
  let [posts, setPosts] = useState();
  // let [comments, setComments] = useState();

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
                  <ListGroupItem>{`Route: ${post.route}`}</ListGroupItem>
                  <ListGroupItem>{`Likes: ${post.likes_count}`}</ListGroupItem>
                  <ListGroupItem>{`Poster name: ${post.poster_name}`}</ListGroupItem>
                  <ListGroupItem>{`Post date: ${post.post_date}`}</ListGroupItem>
              </ListGroup>

              {/* <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body> */}

            </Card>
                 
          </section>

        ))}
    </>
  );
}

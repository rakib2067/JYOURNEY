import React, { useState, useEffect } from "react";

export function Posts() {
  let [posts, setPosts] = useState();
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
      {/* <h1 fontSize="6xl"> (Protected) Account page</h1> */}
      {posts &&
        posts.map((post) => (
          <section className="post">
            <h1>{`Title: ${post.title}`}</h1>
            <p>{`Id: ${post.id}`}</p>
            <p>{`Route: ${post.route}`}</p>
            <p>{`Description: ${post.description}`}</p>
            <p>{`Post date: ${post.post_date}`}</p>
            <p>{`Likes: ${post.likes_count}`}</p>
            <p>{`Poster name: ${post.poster_name}`}</p>
          </section>
        ))}
    </>
  );
}

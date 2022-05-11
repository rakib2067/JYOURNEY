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
            <h1>{post.title}</h1>
            <p>{post.id}</p>
            <p>{post.route}</p>
            <p>{post.description}</p>
            <p>{post.post_date}</p>
            <p>{post.likes_count}</p>
            <p>{post.poster_name}</p>
          </section>
        ))}
    </>
  );
}

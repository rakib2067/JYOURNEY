import React from "react";
import { Posts } from "../../components/Posts";
import "./index.css"

export function Feed() {
  return (
    <>
      <h2 className="feed-title">Feed</h2>
      <Posts />
    </>
  );
}

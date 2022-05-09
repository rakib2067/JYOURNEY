import React from "react";
import { Link } from "react-router-dom";

export function Unauthorized({ loggedIn }) {
  return loggedIn ? (
    <h1>You are already Signed In</h1>
  ) : (
    <h1>
      You are not allowed to access this page. Please
      <Link to="/login">log in</Link> or
      <Link to="/register">sign up</Link> to create an account!
    </h1>
  );
}

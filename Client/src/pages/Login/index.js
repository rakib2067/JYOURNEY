import React from "react";

export function Login({ loginHandler }) {
  return (
    <form action="">
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <input type="submit" />
    </form>
  );
}

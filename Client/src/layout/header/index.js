import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function Header() {
  const nav = useNavigate();
  return (
    <header className="header">
      <h1 className="title" onClick={() => nav("/")}>
        Jyourney
      </h1>
      <ul className="links">
        <NavLink aria-label="link" to="/">
          Home
        </NavLink>
        <NavLink aria-label="link" to="/account">
          Account
        </NavLink>
      </ul>
    </header>
  );
}

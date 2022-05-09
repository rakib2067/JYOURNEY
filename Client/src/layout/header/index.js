import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../auth/auth";

export function Header() {
  const nav = useNavigate();

  const auth = useContext(AuthContext);
  function handleLogOut() {
    axios
      .get("http://127.0.0.1:8000/auth/logout", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        // if logging out then remove user's token and redirect to home
        localStorage.removeItem("token");
        auth.setIsLoggedIn(false);
        nav("/");
      })
      .catch((err) => {
        alert("Logout Unsuccesful", err);
      });
  }
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

        <button onClick={handleLogOut}>Log Out</button>
      </ul>
    </header>
  );
}

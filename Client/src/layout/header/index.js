import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../auth/auth";

import "./index.css";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";

export function Header({ isNotAuth }) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);
  function handleLogOut() {
    setLoading(true);
    axios
      .get("https://jyourney-production.up.railway.app/auth/logout", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        // if logging out then remove user's token and redirect to home
        localStorage.removeItem("token");
        localStorage.removeItem("url");
        auth.setIsLoggedIn(false);
        setLoading(false);
        nav("/");
      })
      .catch((err) => {
        setLoading(false);
        alert("Logout Unsuccesful", err);
      });
  }
  return (
    <header className="header">
      <Image
        className="logo"
        onClick={() => nav("/")}
        src={require("../../img/logo_black.png").default}
      />

      <div className="links">
        {isNotAuth ? (
          <>
            <NavLink to="/register">Register </NavLink>{" "}
            <NavLink to="/login">Login</NavLink>{" "}
          </>
        ) : (
          <>
            {" "}
            <NavLink aria-label="link" to="/" className="navlink">
              Home
            </NavLink>
            <NavLink aria-label="link" to="/account" className="navlink">
              Account
            </NavLink>
            <NavLink aria-label="link" to="/feed" className="navlink">
              Feed
            </NavLink>
            <Button
              className="logout-btn"
              onClick={handleLogOut}
              variant="info"
            >
              {loading && <Spinner animation="border" />}
              Log Out
            </Button>{" "}
          </>
        )}

        {/* <button onClick={handleLogOut}>Log Out</button> */}
      </div>
    </header>
  );
}

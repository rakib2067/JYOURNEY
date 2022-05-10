import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../auth/auth";

import './index.css'
import Image from 'react-bootstrap/Image'


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
       <Image className="logo" onClick={() => nav("/")} src={require('../../img/logo_black.png').default}/>
      
      <div className="links">
        <NavLink aria-label="link" to="/" className='navlink'>
          Home
        </NavLink>
        <NavLink aria-label="link" to="/account" className='navlink'>
          Account
        </NavLink>

        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </header>
  );
}

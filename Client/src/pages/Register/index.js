import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../../layout/header"

import './index.css'
import Container from "react-bootstrap/Container";

export function Register({ handleLogin }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [confirmed, setConfirmed] = useState();

  const goTo = useNavigate();
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const onConfirmedChange = (e) => {
    setConfirmed(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/auth/register", {
        email: email,
        password: password,
        username: username,
        confirmed_password: confirmed,
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("token", resp.data.token);
        handleLogin();
        goTo("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div>
        <Header isNotAuth={true}/>
         <form onSubmit={handleSubmit} action="" className="Regform">
           <input
             type="text"
             onChange={onUsernameChange}
             placeholder="Username..."
             value={username}
             className="input" />
           <input
             type="email"
             onChange={onEmailChange}
             placeholder="Email..."
             value={email}
             className="input" />
           <input
             type="password"
             onChange={onPasswordChange}
             placeholder="Password..."
             value={password}
             className="input" />
           <input
             type="password"
             onChange={onConfirmedChange}
             placeholder="Confirm Password..."
             value={confirmed}
             className="input" />
           <input type="submit" value="Register" className="sbtinput" />
         </form>
         </div>
      </>
   );
 }

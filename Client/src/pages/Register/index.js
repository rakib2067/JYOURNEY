import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <form onSubmit={handleSubmit} action="">
      <input
        type="text"
        onChange={onUsernameChange}
        placeholder="Username"
        value={username}
      />
      <input
        type="email"
        onChange={onEmailChange}
        placeholder="Email"
        value={email}
      />
      <input
        type="password"
        onChange={onPasswordChange}
        placeholder="Password"
        value={password}
      />
      <input
        type="password"
        onChange={onConfirmedChange}
        placeholder="Confirm Password"
        value={confirmed}
      />
      <input type="submit" />
    </form>
  );
}

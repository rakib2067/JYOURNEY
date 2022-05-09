import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../auth/auth";
import { useNavigate } from "react-router-dom";

export function Login({ handleLogin }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { user, setUser } = useContext(AuthContext);
  const goTo = useNavigate();
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    axios
      .post("http://127.0.0.1:8000/auth/login", {
        username: email,
        password: password,
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
        type="email"
        onChange={onEmailChange}
        placeholder="email"
        value={email}
      />
      <input
        type="password"
        onChange={onPasswordChange}
        placeholder="password"
        value={password}
      />
      <input type="submit" />
    </form>
  );
}

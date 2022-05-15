import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../../layout/header";
import "./index.css";
import { Spinner } from "react-bootstrap";

export function Register({ handleLogin }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [confirmed, setConfirmed] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

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
    setLoading(true);

    axios
      .post("https://jyourney.herokuapp.com/auth/register", {
        email: email,
        password: password,
        username: username,
        confirmed_password: confirmed,
      })
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        localStorage.setItem("token", resp.data.token);
        handleLogin();
        goTo("/");
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        setErrors(error.response.data);
        setLoading(false);
      });
  }

  return (
    <>
      <Header isNotAuth={true} />
      <div className="formContainer">
        <form onSubmit={handleSubmit} action="" className="Logform">
          <input
            type="text"
            onChange={onUsernameChange}
            placeholder="Username..."
            value={username}
            className="input"
          />
          {errors && errors.username && (
            <p className="errorText"> {errors.username}</p>
          )}
          <input
            type="email"
            onChange={onEmailChange}
            placeholder="Email..."
            value={email}
            className="input"
          />
          {errors && errors.email && (
            <p className="errorText"> {errors.email}</p>
          )}
          <input
            type="password"
            onChange={onPasswordChange}
            placeholder="Password..."
            value={password}
            className="input"
          />
          {errors && errors.password && (
            <p className="errorText"> {errors.password}</p>
          )}
          <input
            type="password"
            onChange={onConfirmedChange}
            placeholder="Confirm Password..."
            value={confirmed}
            className="input"
          />
          {errors && errors.confirmed_password && (
            <p className="errorText"> {errors.confirmed_password}</p>
          )}
          <button type="submit" className="sbtinput">
            {loading && <Spinner animation="border" />}
            {!loading && <span>Register</span>}
          </button>
        </form>
      </div>
    </>
  );
}

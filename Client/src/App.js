import React from "react";
import { Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import Home from "./components/Home";
import { Welcome, Login, Register } from "./pages";
import ProtectedRoutes from "./ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Route>
    </Routes>
  );
};

export default App;

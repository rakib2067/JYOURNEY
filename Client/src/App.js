import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import Home from "./components/Home";
import { Welcome, Login, Register, DoesNotExist } from "./pages";
import ProtectedRoutes from "./ProtectedRoutes";

import AuthContext from "./auth/auth";
import { Layout } from "./layout";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let loggedIn = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  });
  function handleLogin() {
    setIsLoggedIn(true);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route element={<ProtectedRoutes />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
              </Route>
            </Route>
          </>
        )}
        <Route path="/*" element={<DoesNotExist />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;

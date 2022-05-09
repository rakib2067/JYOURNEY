import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import Home from "./components/Home";
import { Welcome, Login, Register, DoesNotExist, Unauthorized } from "./pages";
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
  }, []);
  function handleLogin() {
    setIsLoggedIn(true);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn }}
    >
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={<Register handleLogin={handleLogin} />}
            />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route element={<ProtectedRoutes />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route
                  path="/login"
                  element={<Unauthorized loggedIn={true} />}
                />
                <Route
                  path="/register"
                  element={<Unauthorized loggedIn={true} />}
                />
              </Route>
            </Route>
          </>
        )}
        <Route path="/account" element={<Unauthorized />} />
        <Route path="/login" element={<Unauthorized />} />
        <Route path="/*" element={<DoesNotExist />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;

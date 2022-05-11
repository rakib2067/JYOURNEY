import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Account } from "./pages/Account";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/globals.css";
import {
  Welcome,
  Login,
  Register,
  DoesNotExist,
  Unauthorized,
  Home,
  Feed,
} from "./pages";
import ProtectedRoutes from "./protectedRoutes";

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
          // if not logged in, then user can have access to login and register pages only

          // Routes Structure isLoggedIn ? AppNavigator (protected routes):AuthNavigator (authentication)
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
        {/* if user is logged in then they can have access to the protected routes*/}
        {isLoggedIn && (
          <>
            <Route element={<ProtectedRoutes />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="/feed" element={<Feed />} />
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

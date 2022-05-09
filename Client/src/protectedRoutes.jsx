import React , { useContext }from "react";
// all routes are protected apart from homepage
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./auth/auth";
import Home from "./components/Home";



const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  // navigate to homepage if not logged in
  return isLoggedIn ? <Outlet /> : <Navigate to="../../"/>;
};

export default ProtectedRoutes;


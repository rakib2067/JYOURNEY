import { Footer } from "./footer";
import { Header } from "./header";
import React from "react";
import { Outlet } from "react-router-dom";
import './index.css'

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

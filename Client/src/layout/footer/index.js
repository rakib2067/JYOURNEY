import React from "react";
import { useLocation } from "react-router-dom";
import "./index.css";

export function Footer() {
  const location = useLocation();
  let classes = "footer";
  if (location.pathname.includes("feed")) {
    classes += " down";
  }

  return (
    <footer aria-label="footer" className={classes}>
      <p className="footer-text">&copy; Created by Team JYOURNEY</p>
    </footer>
  );
}

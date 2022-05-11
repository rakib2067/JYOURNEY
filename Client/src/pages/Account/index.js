import React, { useEffect, useState } from "react";
import axios from "axios";
export function Account() {
  let [routes, setRoutes] = useState();
  useEffect(() => {
    getRoutes();
  }, []);

  async function getRoutes() {
    const resp = await fetch("http://localhost:8000/route/", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    const data = await resp.json();
    setRoutes(data);
    console.log(data);
  }
  return (
    <>
      <h1 fontSize="6xl"> (Protected) Account page</h1>;
    </>
  );
}

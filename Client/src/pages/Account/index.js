import React, { useEffect, useState } from "react";

import { RouteCard } from "../../components";

import "./index.css";

export function Account() {
  const [routes, setRoutes] = useState();

  useEffect(() => {
    getRoutes();
  }, []);
  // test
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
      <h1 fontSize="6xl"> My Journeys</h1>
      {routes &&
        routes.map((route) => <RouteCard key={route.id} route={route} />)}
    </>
  );
}

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
  function onCheckbox(route) {
    const newArray = [...routes];
    console.log(newArray);
    let newRoute = newArray.find((r) => r.id == route.id);
    newRoute.completed = !newRoute.completed;
    setRoutes((prev) => newArray);
  }

  return (
    <>
      <h1 fontSize="6xl"> My Journeys</h1>
      <section className="incomplete">
        <h2>Incompleted</h2>
        {routes &&
          routes.map((route) => {
            return !route.completed ? (
              <RouteCard
                handleCheck={onCheckbox}
                key={route.id}
                route={route}
              />
            ) : null;
          })}
      </section>

      <section className="complete">
        <h2>Completed</h2>
        {routes &&
          routes.map((route) => {
            return route.completed ? (
              <RouteCard
                handleCheck={onCheckbox}
                key={route.id}
                route={route}
              />
            ) : null;
          })}
      </section>
    </>
  );
}

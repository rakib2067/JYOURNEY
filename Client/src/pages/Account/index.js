import React, { useEffect, useState } from "react";

import { RouteCard } from "../../components";
import { getStorage, ref } from "firebase/storage";

import "./index.css";

export function Account() {
  const [routes, setRoutes] = useState();
  const [url, setUrl] = useState();

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

  function handleDelete(route) {
    setRoutes((prev) => prev.filter((r) => r.id !== route.id));
  }

  return (
    <>
      <section className="profile">
        <div className="imgContainer">
          <input type="file" />
          <img src={url} alt="" />
        </div>
        <div className="profile--details">
          <p>Kingoks</p>
          <p>Kingoks@gmail.com</p>
        </div>
      </section>
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
                handleDelete={handleDelete}
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

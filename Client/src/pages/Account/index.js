import React, { useEffect, useRef, useState } from "react";

import { RouteCard } from "../../components";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import "./index.css";
import avatar from "../../img/avatar.jpg";
export function Account() {
  const [routes, setRoutes] = useState();
  const [url, setUrl] = useState(avatar);

  const fileRef = useRef();

  const storage = getStorage();

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

  function handleFile(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        const profileRef = ref(storage, `Profiles/mb.jpg`);
        uploadBytes(profileRef, reader.result).then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });
        setUrl(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <>
      <section className="profile">
        <div className="imgContainer">
          <img className="avatar" src={url} alt="" />
          <input type="file" ref={fileRef} onChange={handleFile} />
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

import React, { useEffect, useState } from "react";

import { RouteCard } from "../../components";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./index.css";
import avatar from "../../img/avatar.jpg";
export function Account() {
  const [routes, setRoutes] = useState();
  const [user, setUser] = useState();
  const [url, setUrl] = useState(avatar);

  const [image, setImage] = useState();
  const storage = getStorage();

  function uploadImage(e) {
    if (image == null) {
      return alert("Error uploading");
    }
    const reader = new FileReader();
    const profileRef = ref(storage, `Profiles/${user.id}`);
    uploadBytes(profileRef, image)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadUrl) => {
        reader.onload = () => {
          if (reader.readyState == 2) {
            setUrl(reader.result);
          }
        };
        reader.readAsDataURL(image);
        console.log("Download URL", downloadUrl);
      });
  }

  useEffect(() => {
    getRoutes();
    getUser();
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
  async function getUser() {
    const resp = await fetch("http://localhost:8000/auth/user", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    const data = await resp.json();
    getDownloadURL(ref(storage, `Profiles/${data.id}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        localStorage.setItem("profilepic", url);
        setUrl(url);
      })
      .catch((error) => {
        // Handle any errors
      });
    setUser(data);
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
          <img className="avatar" src={url} alt="" />
          {user && (
            <>
              <p>{user.username}</p>
            </>
          )}
        </div>
        <div>
          <input
            className="pp-btn"
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <button className="avatar-btn" onClick={uploadImage}>
            Upload
          </button>
        </div>
      </section>
      <h1 fontSize="6xl"> My Journeys</h1>
      <section className="incomplete">
        <h2 className="incompleted">Incompleted</h2>
        {routes &&
          routes.map((route) => {
            return !route.completed ? (
              <RouteCard
                handleCheck={onCheckbox}
                handleDelete={handleDelete}
                key={route.id}
                route={route}
              />
            ) : null;
          })}
      </section>

      <section className="complete">
        <h2 className="completed">Completed</h2>
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

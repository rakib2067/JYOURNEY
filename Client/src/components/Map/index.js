import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerClusterer,
} from "@react-google-maps/api";
import Toast from "react-bootstrap/Toast";
import { Places } from "../Places";
import { Distance } from "../Distance";
import "./index.css";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";

export function Map() {
  const [starting, setStarting] = useState();
  const [destination, setDestination] = useState();
  const [directions, setDirections] = useState();
  const [routeTitle, setRouteTitle] = useState();
  const mapRef = useRef();
  const [showToast, setShowToast] = useState(false);

  const center = useMemo(() => ({ lat: 51.50249799, lng: -0.12249951 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const houses = useMemo(() => generateHouses(center), [center]);

  // highlight text when user clicks 'add route'
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const fetchDirections = () => {
    if (!starting && destination) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: starting.coords,
        destination: destination.coords,
        travelMode: google.maps.TravelMode.BICYCLING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
    console.log(starting, destination);
    setRouteTitle(`${starting.title} to ${destination.title}`);
  };
  async function addRoute() {
    let data = {
      starting_latitude: starting.coords.lat.toFixed(6),
      starting_longitude: starting.coords.lng.toFixed(6),
      destination_latitude: destination.coords.lat.toFixed(6),
      destination_longitude: destination.coords.lng.toFixed(6),
      route_title: routeTitle,
      distance: directions.routes[0].legs[0].distance.text,
      duration: directions.routes[0].legs[0].duration.text,
    };
    console.log(directions);
    console.log(JSON.stringify(data));
    let response = await fetch("http://127.0.0.1:8000/route/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      let json = await response.json();
      console.log(json);
      setShowToast(true);
    } else {
      alert("Failed to add route");
    }
  }

  return (
    <>
      <div className="mapContainer">
        <div>
          <GoogleMap
            zoom={12}
            center={center}
            mapContainerClassName="map-container"
            options={options}
            onLoad={onLoad}
          >
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    zIndex: 50,
                    strokeColor: "#1976D2",
                    strokeWeight: 5,
                  },
                }}
              />
            )}

            {starting && (
              <>
                <Marker
                  position={starting.coords}
                  icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                />

                <MarkerClusterer>
                  {(clusterer) =>
                    houses.map((house) => (
                      <Marker
                        key={house.lat}
                        position={house}
                        clusterer={clusterer}
                        onClick={() => {
                          fetchDirections(house);
                        }}
                      />
                    ))
                  }
                </MarkerClusterer>
              </>
            )}
          </GoogleMap>
        </div>
      </div>
      {/* <Toast
        className="route--toast"
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        bg="success"
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Success</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body className="Success">Added Route!</Toast.Body>
      </Toast> */}
      <div className="controls">
        <h1>Commute?</h1>
        <Places
          setLocation={(position) => {
            setStarting(position);
            mapRef.current?.panTo(position.coords);
          }}
          placeholder="From..."
        />
        <Places
          setLocation={(position) => {
            setDestination(position);
            mapRef.current?.panTo(position.coords);
          }}
          placeholder="To..."
        />
        <button className="submit-btn" onClick={fetchDirections}>
          Submit
        </button>

        <button
          ref={target}
          className="addroute-btn"
          disabled={routeTitle ? false : true}
          onClick={() => {
            addRoute();
            setShow(!show);
          }}
        >
          Add Route
        </button>
        <Overlay
          bg="Success"
          target={target.current}
          delay={{ show: 250, hide: 400 }}
          show={show}
          placement="right"
        >

          {(props) => (
            <Tooltip onClick= {() => {setShow(!show);}} 
            
            bg="success" id="overlay-example" {...props}>
              You added a route!
            </Tooltip>
          )}
        </Overlay>

        {!starting && <p>Enter the address of your journey</p>}
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
    </>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const generateHouses = (position) => {
  const _houses = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};

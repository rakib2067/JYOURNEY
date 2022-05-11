import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerClusterer,
} from "@react-google-maps/api";
import { Places } from "../Places";
import { Distance } from "../Distance";
import "./index.css"


export function Map() {
  const [starting, setStarting] = useState();
  const [destination, setDestination] = useState();
  const [directions, setDirections] = useState();
  const [routeTitle, setRouteTitle] = useState();
  const mapRef = useRef();

  const center = useMemo(() => ({ lat: 51.50249799, lng: -0.12249951 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const houses = useMemo(() => generateHouses(center), [center]);

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

    let json = await response.json();
    console.log(json);
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
      <div className="controls">
        <h1>Commute?</h1>
        <Places
          setLocation={(position) => {
            setStarting(position);
            mapRef.current?.panTo(position.coords);
          }}
          placeholder="From"
        />
        <Places
          setLocation={(position) => {
            setDestination(position);
            mapRef.current?.panTo(position.coords);
          }}
          placeholder="To"
        />
        <button className="submit-btn" onClick={fetchDirections}>Submit</button>
        <button className="addroute-btn" disabled={routeTitle ? false : true} onClick={addRoute}>
          Add Route
        </button>
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

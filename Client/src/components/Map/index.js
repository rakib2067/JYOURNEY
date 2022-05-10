import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import { Places } from "../Places";
import { Distance } from "../Distance";

export function Map() {
  const [starting, setStarting] = useState();
  const [destination, setDestination] = useState();
  const [directions, setDirections] = useState();
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 51.5012, lng: -0.1354 }), []);
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
        origin: starting,
        destination: destination,
        travelMode: google.maps.TravelMode.BICYCLING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div className="container">
      <div className="controls">
        <h1>Commute?</h1>
        <Places
          setLocation={(position) => {
            setStarting(position);
            mapRef.current?.panTo(position);
          }}
        />
        <Places
          setLocation={(position) => {
            setDestination(position);
            mapRef.current?.panTo(position);
          }}
        />
        <button onClick={fetchDirections}>Submit</button>
        {!starting && <p>Enter the address of your starting.</p>}
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
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
                position={starting}
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

import React, { useMemo } from "react";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import "./index.css";
import { Map } from "../../components/Map";

import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const goTo = useNavigate();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBo05dfuypv2g57ktjFAyPAYGe-5Nv4h_0",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map />
      <div className="d-grid gap-2">

      <Button variant="secondary" size="lg" onClick={() => goTo('/Account')} style={{cursor: 'pointer'}}>
        Save Route
      </Button>

      <h1>Latest Posts</h1>

     
      <Button variant="primary" size="lg"  onClick={() => goTo('/Feed')} style={{cursor: 'pointer'}}>
        View Feed Page
      </Button>
      
    </div>
    </>


  );
};

const containerStyle = {
  minWidth: "320px",
  width: "50vw",

  minHeight: "320px",
  height: "35vw",
};
// function Map() {
//   const center = useMemo(() => ({ lat: 51.5012, lng: -0.1354 }), []);

//   return (
//     <div id="test" className="container">
//       <GoogleMap mapContainerStyle={containerStyle} zoom={10} center={center}>
//         <Marker position={center} />
//       </GoogleMap>
//     </div>
//   );
// }

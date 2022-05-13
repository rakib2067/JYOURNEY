import React from "react";
import "./index.css"

export function Distance({ leg }) {
  return (
    <div>
      <p className="text">Distance: {leg.distance.text}</p>
      <p className="text">Estimated Duration: {leg.duration.text}</p>
    </div>
  );
}

import React from "react";

export function Distance({ leg }) {
  return (
    <div>
      <p>Distance: {leg.distance.text}</p>
      <p>Estimated Duration: {leg.duration.text}</p>
    </div>
  );
}

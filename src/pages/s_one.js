import React from "react";
import '../styles/s_one.css';

export default function S_ONE({ img }) {
  return (
    <div className="container1">
      {/* Render the image with the provided URL */}
      <img
        loading="lazy"
        src={img}
        alt="Map"
        
        className="map-image1"
      />
    </div>
  );
}

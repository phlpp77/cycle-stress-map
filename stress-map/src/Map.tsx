import "./Map.css";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map(): JSX.Element {
  return (
    <div className="Map">
      <header className="Map-header">
        <h2>
          <b>Stress Map</b> <code>[unstable prototype]</code>
        </h2>
        <MapContainer
          center={[33.753746, -84.38633]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </header>
    </div>
  );
}

export default Map;
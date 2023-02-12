import "./Map.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";

// TODO: type not complete
type note = {
  id: number;
  user_id: number;
  trip_id: string;
  latitude: number;
  longitude: number;
  details: string;
};

function Map(): JSX.Element {
  const [coords, setCoords] = useState<note[]>([]);

  useEffect(() => {
    const fetchAllCoords = async () => {
      try {
        const res = await axios.get("http://localhost:8800/note");
        setCoords(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCoords();
  }, []);

  // Create array to be used in line
  const lineArray: LatLngExpression[] = coords.map((coord) => [
    coord.latitude,
    coord.longitude,
  ]);

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

          {/* Placing markers at note positions */}
          {coords.map((coord) => (
            <Marker position={[coord.latitude, coord.longitude]} key={coord.id}>
              <Popup>
                {coord.details !== "" ? coord.details : "No text added."}
              </Popup>
            </Marker>
          ))}

          {/* Creating a line based on coords */}
          <Polyline positions={[lineArray.slice(0, 4)]} />
        </MapContainer>
      </header>
    </div>
  );
}

export default Map;

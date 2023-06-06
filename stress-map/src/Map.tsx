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

type trip = {
  id: number;
  latitude: number;
  longitude: number;
};

function Map(): JSX.Element {
  const [trip, setTrip] = useState<trip[]>([]);
  const [coords, setCoords] = useState<note[]>([]);
  const [snapCoords, setSnapCoords] = useState<[]>([]);

  // Fetch all notes from server
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

  // Fetch all coords from a certain trip from server
  useEffect(() => {
    const fetchTripWithID = async () => {
      try {
        const response = await axios.get("http://localhost:8800/trip");
        setTrip(response.data);
        console.log("Created line with data");
      } catch (error) {
        console.log(error);
      }
    };
    fetchTripWithID();
  }, []);

  // Fetch all snappedCoords from server used to put on the streetgrid
  useEffect(() => {
    const fetchAllSnapCoords = async () => {
      try {
        const res = await axios.get("http://localhost:8800/snap");
        setSnapCoords(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllSnapCoords();
  }, []);

  // Create array to be used in line
  const lineArray: LatLngExpression[] = trip.map((coord) => [
    coord.latitude,
    coord.longitude,
  ]);

  // Test data with raw coordinates
  const rawArray: LatLngExpression[] = [
    [33.787551958257, -84.359147478562],
    [33.787571290927, -84.35914751250401],
    [33.787598305876, -84.35915108828901],
  ];

  // Test data with snapped coordinates
  const testArray: LatLngExpression[] = [
    [33.787606, -84.359147],
    [33.787606, -84.359148],
    [33.787606, -84.359151],
    [33.787606, -84.359169],
    [33.787605, -84.3592],
    [33.787605, -84.359243],
    [33.787605, -84.35929],
    [33.787605, -84.359332],
    [33.787605, -84.359384],
    [33.787605, -84.359452],
  ];

  return (
    <div className="Map">
      <header className="Map-header">

        {/* Header */}
        <h2>
          <b>Stress Map</b> <code>[unstable prototype]</code>
        </h2>

{/* Map container form Leaflet */}
        <MapContainer
          center={[33.753746, -84.38633]}
          zoom={13}
          scrollWheelZoom={true}
        >

          {/* Get required title/map design from openstreetmap */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Placing markers at note positions (incl. the node as text*/}
          {coords.map((coord) => (
            <Marker position={[coord.latitude, coord.longitude]} key={coord.id}>
              <Popup>
                {coord.details !== "" ? coord.details : "No text added."}
              </Popup>
            </Marker>
          ))}

          {/* Creating lines (snapped) based on coords */}
          <Polyline positions={[lineArray]} color="red" />
          <Polyline positions={[snapCoords]} color="green" />
          
        </MapContainer>
      </header>
    </div>
  );
}

export default Map;

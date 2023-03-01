import express from "express";
import mysql from "mysql";
import cors from "cors";
import axios from "axios";

// Set up express.js server
const app = express();

// Set up MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "ph",
  password: "password",
  database: "stress_map_cycle_atl",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Backend reached.");
});

// Get notes
app.get("/note", (req, res) => {
  // Query to get all lat and long data from note table
  const query = "SELECT id, latitude, longitude, details FROM note";

  // Send query to db connection
  db.query(query, (err, data) => {
    if (err) return res.json(err); // When error occurs send client error code
    return res.json(data);
  });
});

// Get trip with certain trip_id
app.get("/trip", (req, res) => {
  // Query to get all lat and long data from coords with matching trip_id and only starting at 50 max 150 coords
  const query =
    "SELECT trip_id, latitude, longitude FROM coord WHERE trip_id=76 LIMIT 50, 150;";

  // Send query to db connection
  db.query(query, (err, data) => {
    if (err) return res.json(err); // When error occurs send client error code
    return res.json(data);
  });
});

// Get matched trip data
app.get("/matched", (req, res) => {
  const query =
    "SELECT trip_id, latitude, longitude FROM coord WHERE trip_id=76 LIMIT 50, 10;";

  var coords = [];
  // Send query to db connection
  db.query(query, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      coords = data;
      console.log("***PRINT COORD DATA***");
      console.log(coords);
    }
  });

  axios
    .get(
      "http://router.project-osrm.org/route/v1/driving/33.787551958257,-84.359147478562;33.787571290927,-84.35914751250401;33.787598305876,-84.35915108828901?overview=false"
    )
    .then((response) => {
      console.log(response.data);

      var rawCoords = [];
      coords.forEach((coordObj) => {
        rawCoords.push(coordObj.latitude, coordObj.longitude);
      });

      console.log("***PRINT RAW COORD DATA***");
      console.log(rawCoords.toString());

      return res.json(response.data);
    });
});

app.listen(8800, () => {
  console.log("Connection to backend successful.");
});

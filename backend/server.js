const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios");

// Set up express.js server
const app = express();

// TODO: Create remote db
// Set up MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "ph",
  password: "password",
  database: "stress_map_cycle_atl",
});

app.use(express.json());
app.use(cors());

// Test response to check if server is running and available 
app.get("/test", (req, res) => {
  res.json("Backend reached.");
});

// Get all notes that were entered on Cycle ATL data
app.get("/note", (req, res) => {
  // Query to get all lat and long data from note table
  const query = "SELECT id, latitude, longitude, details FROM note";

  // Send query to db connection
  db.query(query, (err, data) => {
    if (err) return res.json(err); // When error occurs send client error code
    return res.json(data);
  });
});

// Get trip coordinates with certain trip_id
app.get("/trip", (req, res) => {
  // Query to get all lat and long data from coords with matching trip_id and only starting at 50 max 150 coords
  const query =
    "SELECT trip_id, latitude, longitude FROM coord WHERE trip_id=76;";

  // Send query to db connection
  db.query(query, (err, data) => {
    if (err) return res.json(err); // When error occurs send client error code
    return res.json(data);
  });
});

// Get data to be matched with OSRM 
app.get("/matched", (req, res) => {
  const query =
    "SELECT trip_id, latitude, longitude FROM coord WHERE trip_id=76;";

  var coords = [];
  // Send query to db connection
  db.query(query, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      coords = data;
      console.log("***PRINT COORD DATA***");
      console.log(coords);
      // Create array in reverse format for API
      let coordArray = coords.map(({ latitude, longitude }) => [
        longitude,
        latitude,
      ]);
      console.log(coordArray.toString());
      let stringArray = coordArray.toString();

      // Replace every second comma with semi-colon to address API correctly
      let n = 2;
      let ch = ",";
      let regex = new RegExp(
        "((?:[^" + ch + "]*" + ch + "){" + (n - 1) + "}[^" + ch + "]*)" + ch,
        "g"
      );
      let urlCoords = stringArray.replace(regex, "$1;");
      console.log(urlCoords);
      return res.json(urlCoords); // - PROBLEM
    }
  });
});

// Snap data with OSRM to streetgrid of Atlanta
app.get("/snap", (req, res) => {
  axios.get("http://localhost:4000/matched").then((response) => {
    console.log(response.data);
    let url = `http://localhost:5000/match/v1/foot/${response.data}`;
    console.log(url);
    axios
      .get(url)
      .then((response2) => {
        // only returns the snapped location]
        console.log(response2.data.tracepoints.some((item) => item === null));
        let tracepoints = response2.data.tracepoints.filter(function (
          tracepoint
        ) {
          return tracepoint !== null;
        });
        console.log(tracepoints.some((item) => item === undefined));

        let snappedCoords = tracepoints.map(({ location }) => location);
        // Reverse each coord so latitude is before longitude
        snappedCoords.forEach((coord) => {
          coord.reverse();
          console.log(coord);
        });
        return res.json(snappedCoords);
      })
      .catch((error) => {
        console.log(error);
      });

    // return res.json("ERROR");
  });
});

// Open the port 4000 to listen to requests
app.listen(4000, () => {
  console.log("Connection to backend successful.");
});

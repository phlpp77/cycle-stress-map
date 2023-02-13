import express from "express";
import mysql from "mysql";
import cors from "cors";

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
  // Query to get all lat and long data from coords with matching trip_id
  const query = "SELECT latitude, longitude FROM coord WHERE trip_id=76;";

  // Send query to db connection
  db.query(query, (err, data) => {
    if (err) return res.json(err); // When error occurs send client error code
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connection to backend successful.");
});

import express from "express";
import mysql from "mysql";

// Set up express.js server
const app = express();

// Set up MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "ph",
  password: "password",
  database: "stress_map_cycle_atl",
});

// Get notes
app.get("/note", (req, res) => {
  // Query to get all lat and long data from note table
  const query = "SELECT latitude,longitude FROM note";

  // Send query to db connection
  db.query(query, (err, data) => {
    if (err) return res.json(err); // When error occurs send client error code
    return res.json(data);
  });
});

app.get("/", (req, res) => {
  res.json("Backend reached.");
});

app.listen(8800, () => {
  console.log("Connection to backend successful.");
});
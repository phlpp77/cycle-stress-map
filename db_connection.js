var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "ph",
    password: "password",
    database: "stress_map_cycle_atl"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT latitude,longitude FROM note", function (err, result, fields) {
      if (err) throw err;
      console.log(result[0].latitude);
    });
  });
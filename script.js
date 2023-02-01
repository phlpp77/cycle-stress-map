// Initilze map
var map = L.map("map");
// Set view (Lat, Long, Zoom)
map.setView([33.753746, -84.38633], 13);

// Add tiles with (lat, long, current zoom) maxZoom, and copyright logo
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

navigator.geolocation.watchPosition(success, error);

let marker, circle, zoomed;

// User allows access to location info
function success(pos) {
  const lat = pos.coords.latitude;
  const long = pos.coords.longitude;
  const accuracy = pos.coords.accuracy; // how accurate the results are within a number of meters

  // Remove old marker to only show the current position of the user
  if (marker) {
    map.removeLayer(marker);
    map.removeLayer(circle);
  }

  marker = L.marker([lat, long]).addTo(map);
  circle = L.circle([lat, long, { radius: accuracy }]).addTo(map);

  // Only zoom to the updated coordinate once
  if (!zoomed) {
    zoomed = map.fitBounds(circle.getBounds());
  }

  // Update map to new location but not zoom back in
  map.setView([lat, long]);
}

// User denies access to location info
function error(err) {
  // User denied access
  if (err === 1) {
    alert("Please allow geolocation access!");
  } else {
    alert("Cannot get current location, check browser settings");
  }
}

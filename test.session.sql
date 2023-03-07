-- @block basics
-- SELECT * FROM email;
-- SELECT * FROM trip ORDER BY n_coord DESC;
SELECT user.email, trip.n_coord FROM user 
JOIN trip ON user.id = trip.user_id
WHERE email IS NOT NULL
ORDER BY n_coord DESC;

-- @block trips
SELECT * FROM trip ORDER BY id ASC;

-- @block notes
SELECT id, latitude,longitude, details FROM note;

-- @block coords
SELECT latitude, longitude FROM coord;

-- @block trip from trip id
SELECT latitude, longitude FROM coord
WHERE (trip_id=76 and latitude IS NOT NULL and longitude IS NOT NULL)
LIMIT 280, 20;
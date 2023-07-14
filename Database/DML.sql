/*----------------
ROOM TYPES
----------------*/
-- get all room types
SELECT * FROM RoomTypes 

-- add a new room type
INSERT INTO RoomTypes (room_type_name, rate_per_night)
VALUES ('${data.room_type_name}', '${data.rate_per_night}');

-- update room type
UPDATE RoomTypes
SET room_type_name = '${data.room_type_name}', rate_per_night = '${data.rate_per_night}'
WHERE room_type_id = '${data.room_type_id}';

-- delete room type
DELETE FROM RoomTypes WHERE room_type_id = ${room_type_id};

/*----------------
ROOMS 
----------------*/

-- get room type ID, name, for room type dropdown
SELECT * FROM RoomTypes;

-- get all rooms and their room type name for the Room Inventory page
SELECT Rooms.room_id, Rooms.room_number, RoomTypes.room_type_name 
FROM Rooms 
INNER JOIN RoomTypes ON Rooms.room_type_id = RoomTypes.room_type_id
ORDER BY room_id;

-- add a new room
INSERT INTO Rooms (room_number, room_type_id)
VALUES ('${data.room_number}', '${data.room_type_id}');

-- delete a room 
DELETE FROM Rooms WHERE room_id = ${room_id};

-- udpate a room
UPDATE Rooms
SET room_number = '${data.room_number}', room_type_id = '${data.room_type_id}'
WHERE room_id = '${data.room_id}';

/*-------
EMPLOYEES 
--------*/

-- get all employees
SELECT * FROM Employees 

-- add a new employee
INSERT INTO Employees (first_name, last_name, job_title, hourly_pay_rate) 
VALUES ('${data.first_name}', '${data.last_name}', '${data.job_title}', '${data.hourly_pay_rate}');

-- update employee
UPDATE Employees 
SET first_name = '${data.first_name}', last_name = '${data.last_name}', job_title = '${data.job_title}', hourly_pay_rate = '${data.hourly_pay_rate}' 
WHERE employee_id = '${data.employee_id}';

-- delete an employee
DELETE FROM Employees WHERE employee_id = ${employee_id};

/*------------------
EMPLOYEE ASSIGNMENTS
------------------*/

-- get all employee assignments
SELECT EmployeesByRooms.employee_room_id, Rooms.room_number, Employees.first_name, Employees.last_name
FROM EmployeesByRooms
INNER JOIN Rooms ON EmployeesByRooms.room_id = Rooms.room_id
INNER JOIN Employees ON EmployeesByRooms.employee_id = Employees.employee_id
ORDER BY EmployeesByRooms.employee_room_id;

-- add employee assignment
INSERT INTO EmployeesByRooms (room_id, employee_id) 
VALUES ('${data['input-room_id']}', '${data['input-employee_id']}');

-- update employee assignment
UPDATE EmployeesByRooms
SET room_id = '${data.room_id}', employee_id = '${data.employee_id}'
WHERE employee_room_id = '${data.employee_room_id}';

-- delete room assignment
DELETE FROM EmployeesByRooms WHERE employee_room_id = '${employee_room_id}';

/*----
GUESTS
-----*/

-- get all guests
SELECT * FROM Guests;

-- add new guest
INSERT INTO Guests (first_name, last_name, email, vip) 
VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', '${data.vip}');

-- update guest
UPDATE Guests 
SET first_name = '${data.first_name}', last_name = '${data.last_name}', email = '${data.email}', vip = '${data.vip}' 
WHERE guest_id = '${data.guest_id}';

-- delete guest
DELETE FROM Guests WHERE guest_id = ${guest_id};

/*------
BOOKINGS
------*/

-- get all bookings
SELECT Bookings.booking_id, Bookings.number_of_guests, Bookings.bed_type, Bookings.check_in_date, Bookings.number_of_nights, (Bookings.number_of_nights * RoomTypes.rate_per_night) AS total_rate, Guests.first_name, Guests.last_name, Rooms.room_number, RoomTypes.room_type_name
FROM Bookings
LEFT JOIN Guests ON Bookings.guest_id = Guests.guest_id
LEFT JOIN Rooms ON Bookings.room_id = Rooms.room_id
LEFT JOIN RoomTypes ON Bookings.room_type_id = RoomTypes.room_type_id
ORDER BY booking_id;

-- add new booking
INSERT INTO Bookings (number_of_guests, bed_type, check_in_date, number_of_nights, total_rate, guest_id, room_id, room_type_id) 
VALUES ('${data.number_of_guests}', '${data.bed_type}', '${data.check_in_date}', '${data.number_of_nights}', (SELECT RoomTypes.rate_per_night FROM RoomTypes INNER JOIN Rooms ON RoomTypes.room_type_id = Rooms.room_type_id WHERE room_id = ${data.room_id}) * ${data.number_of_nights}, '${data.guest_id}', '${data.room_id}', (SELECT RoomTypes.room_type_id FROM RoomTypes INNER JOIN Rooms ON RoomTypes.room_type_id = Rooms.room_type_id WHERE room_id = ${data.room_id}));

-- update booking 
UPDATE Bookings
SET number_of_guests = ${data.number_of_guests}, bed_type = '${data.bed_type}', check_in_date = '${data.check_in_date}', number_of_nights = ${data.number_of_nights}, total_rate = (SELECT RoomTypes.rate_per_night FROM RoomTypes INNER JOIN Rooms ON RoomTypes.room_type_id = Rooms.room_type_id WHERE room_id = ${data.room_id}) * ${data.number_of_nights}, guest_id = ${data.guest_id}, room_id = ${data.room_id}, room_type_id = (SELECT RoomTypes.room_type_id FROM RoomTypes INNER JOIN Rooms ON RoomTypes.room_type_id = Rooms.room_type_id WHERE room_id = ${data.room_id})
WHERE booking_id = ${data.booking_id};

-- delete booking
DELETE FROM Bookings WHERE booking_id = '${data.booking_id}'; 

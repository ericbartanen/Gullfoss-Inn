
-- -- Ignore Foreign Key Checks
-- SET FOREIGN_KEY_CHECKS=0;

-- -- Don't commit after each query
-- SET AUTOCOMMIT = 0;

-- Control for existing tables
DROP TABLE IF EXISTS RoomTypes, Rooms, Guests, Bookings, Employees, EmployeesByRooms;

/*-----------
Create Tables 
------------*/

CREATE TABLE RoomTypes (
        room_type_id SERIAL,
        room_type_name varchar(145) NOT NULL,
        rate_per_night decimal(19,2) NOT NULL,
        PRIMARY KEY(room_type_id)
);

CREATE TABLE Rooms (
	room_id SERIAL,
	room_number int UNIQUE NOT NULL,
	room_type_id int NOT NULL,
	PRIMARY KEY (room_id),
	FOREIGN KEY (room_type_id) REFERENCES RoomTypes(room_type_id) ON DELETE CASCADE
);

-- creates table of guests with personal guest info
CREATE TABLE Guests (
        guest_id SERIAL,
        first_name varchar(145) NOT NULL,
        last_name varchar(145) NOT NULL, 
        email varchar(145) NOT NULL,
        vip boolean NOT NULL,
        PRIMARY KEY (guest_id)
);

CREATE TABLE Bookings (
        booking_id SERIAL, 
        number_of_guests int NOT NULL,
        bed_type varchar(145) NOT NULL,
        check_in_date Date NOT NULL,
        number_of_nights int NOT NULL,
        total_rate decimal(19, 2) NOT NULL,
        guest_id int,
        room_id int,
        room_type_id int,
        PRIMARY KEY (booking_id),
        FOREIGN KEY (guest_id) REFERENCES Guests(guest_id) ON DELETE SET NULL, 
        FOREIGN KEY (room_id) REFERENCES Rooms(room_id) ON DELETE SET NULL, 
        FOREIGN KEY (room_type_id) REFERENCES RoomTypes(room_type_id) ON DELETE SET NULL 
);

 -- creates table of employees with personal employee info       
CREATE TABLE Employees (
        employee_id SERIAL,
        first_name varchar(145) NOT NULL,
        last_name varchar(145) NOT NULL, 
        job_title varchar(145) NOT NULL,
        hourly_pay_rate decimal(19,2) NOT NULL,
        PRIMARY KEY (employee_id)
);

-- Junction table for M:N relationship between Employees and Rooms. 
CREATE TABLE EmployeesByRooms (
        employee_room_id SERIAL, 
        room_id int,
        employee_id int,
        PRIMARY KEY (employee_room_id),
        FOREIGN KEY (room_id) REFERENCES Rooms(room_id) ON DELETE CASCADE, -- If a room or employee is deleted, delete the work assignment.
        FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE 
);

/*---------
Insert Data 
---------*/

INSERT INTO RoomTypes (room_type_name, rate_per_night)
VALUES ('Standard', 329), ('Deluxe', 443), ('Junior Suite', 527), ('Suite', 634);

INSERT INTO Rooms (room_number, room_type_id)
VALUES (1, 3), (2, 2), (3, 1), (4, 2), (5, 4);

INSERT INTO Guests (first_name, last_name, email, vip)
VALUES ('Fernanda', 'Paz', 'fpaz@yoo.com', False), 
('Todd', 'Smith', 'tsmith@mail.com', False), 
('Susan', 'Dahls', 'sdahls@yoo.com', True),
('Weston', 'Erickson', 'wes@me.com', False);

INSERT INTO Bookings (number_of_guests, bed_type, check_in_date, number_of_nights, total_rate, guest_id, room_id, room_type_id)
VALUES (1, 'Queen', '2023-01-01', 1, 329, 1, 1, 1),
(2, 'King', '2023-01-02', 3, 1581, 2, 2, 3),
(3, 'Full', '2023-01-03', 5, 2215, 3, 3, 2),
(4, 'King', '2023-01-04', 2, 2536, 4, 4, 4);

INSERT INTO Employees (first_name, last_name, job_title, hourly_pay_rate)
VALUES ('Jarpy', 'Grimmson', 'Concierge', 30), 
('Lily', 'Helgasdottir', 'Maintenance', 25), 
('Kendra', 'Jonsdottir', 'Housekeeping', 25),
('Elias', 'Sturlson', 'Housekeeping', 25);

INSERT INTO EmployeesByRooms (room_id, employee_id)
VALUES (1, 3), (5, 4), (2, 2), (4, 1), (3, 3);

-- Reestablish foreign key checks and commit queries
-- SET FOREIGN_KEY_CHECKS=1;
COMMIT;

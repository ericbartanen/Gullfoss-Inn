require('dotenv').config();

// Express
const express = require('express');   
const app     = express();           
const PORT    = 1913;                 

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

// Database
const db = require('./Database/db-connector')

// Handlebars
const handlebars = require("handlebars");
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Handlebars dateFormat Helper
handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

// Handlebars currency formatter 
handlebars.registerHelper('currency', function (num) {
    return Intl.NumberFormat("en-IN", {style: "currency", currency: "USD"}).format(num)
});

// Handlebars VIP formatter
handlebars.registerHelper('vip', function (num) {
    if (num == 0){
        return "No"
    } else {
        return "Yes"
    }  
});

/*
    GET ROUTES
*/

app.get('/', function(req, res){
    return res.render('index')
});

app.get('/bookings', function(req, res)
    {
        let query1 = `SELECT Bookings.booking_id, Bookings.number_of_guests, Bookings.bed_type, Bookings.check_in_date, 
                        Bookings.number_of_nights, (Bookings.number_of_nights * RoomTypes.rate_per_night) AS total_rate, Guests.first_name, Guests.last_name, Rooms.room_number, RoomTypes.room_type_name
                        FROM Bookings
                        LEFT JOIN Guests ON Bookings.guest_id = Guests.guest_id
                        LEFT JOIN Rooms ON Bookings.room_id = Rooms.room_id
                        LEFT JOIN RoomTypes ON Bookings.room_type_id = RoomTypes.room_type_id
                        ORDER BY booking_id;`

        let query2 = "SELECT * FROM Guests;" // Read data from Guests for dynamic dropdowns
        let query3 = "SELECT * FROM Rooms;"  // Read data from Rooms for dynamic dropdowns

        db.pool.query(query1, function(error, rows, fields){

            if (error) {
                console.log(error)
            }

            let bookings = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let guests = rows;

                db.pool.query(query3, (error, rows, fields) => {

                    let rooms = rows;
                    
                    return res.render('bookings', {data: bookings.rows, guests: guests.rows, rooms: rooms.rows});
                })
            })  
        })
    });

app.get('/rooms', function(req, res)
    {
        let query1 = `SELECT Rooms.room_id, Rooms.room_number, RoomTypes.room_type_name 
                        FROM Rooms 
                        INNER JOIN RoomTypes ON Rooms.room_type_id = RoomTypes.room_type_id
                        ORDER BY room_id;`

        let query2 = "SELECT * FROM RoomTypes;"  // read data from RoomTypes for dynamic dropdown

        db.pool.query(query1, function(error, rows, fields){

            if (error) {
                console.log(error)
            }

            let rooms = rows;

            db.pool.query(query2, function(error, rows, fields){

                let roomTypes = rows;

                res.render('rooms', {data: rooms.rows, roomTypes: roomTypes.rows});
            })
        })
    });

app.get('/roomTypes', function(req, res)
    {
        let query1 = "SELECT * FROM RoomTypes;";
        db.pool.query(query1, function(error, rows, fields){
            if (error) {
                console.log(error)
            }
            res.render('roomTypes', {data: rows.rows});
        })
    });

app.get('/employees', function(req, res)
    {
        let query1 = "SELECT * FROM Employees;";

        db.pool.query(query1, function(error, rows, fields){
            if (error) {
                console.log(error)
            }

            res.render('employees', {data: rows.rows});
        })
    });

app.get('/employeeAssignments', function(req, res)
    {

        let query1 = `SELECT EmployeesByRooms.employee_room_id, Rooms.room_number, Employees.first_name, Employees.last_name
                        FROM EmployeesByRooms
                        INNER JOIN Rooms ON EmployeesByRooms.room_id = Rooms.room_id
                        INNER JOIN Employees ON EmployeesByRooms.employee_id = Employees.employee_id
                        ORDER BY EmployeesByRooms.employee_room_id;`

        let query2 = 'SELECT * FROM Rooms'       // read data from Rooms for dynamic dropdown

        let query3 = 'SELECT * FROM Employees'   // read data from Employees for dynamic dropdown
        
        db.pool.query(query1, function(error, rows, fields){
            if (error) {
                console.log(error)
            }

            let query1 = rows;

            db.pool.query(query2, function(error, rows, fields){

                let query2 = rows;

                db.pool.query(query3, function(error, rows, fields){

                    let query3 = rows;

                    res.render('employeeAssignments', {data: query1.rows, rooms: query2.rows, employees: query3.rows});
                })
            })
        })
    });

app.get('/guests', function(req, res)
    {
        let query1 = "SELECT * FROM Guests;";

        db.pool.query(query1, function(error, rows, fields){
            if (error) {
                console.log(error)
            }
            res.render('guests', {data: rows.rows});
        })
    });

/*
    POST ROUTES
*/

app.post('/add-assignment-form', function(req, res){
    let data = req.body;

     query1 = `INSERT INTO EmployeesByRooms (room_id, employee_id) 
                VALUES ('${data['input-room_id']}', '${data['input-employee_id']}`;
     
     db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/');
        }
    })
})

app.post('/addGuest', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO Guests (first_name, last_name, email, vip) 
                VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', '${data.vip}')`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM Guests;';
            db.pool.query(query2, function(error,rows,fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/addBooking', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO Bookings (number_of_guests, bed_type, check_in_date, number_of_nights, total_rate, guest_id, room_id, room_type_id) 
                VALUES ('${data.number_of_guests}', '${data.bed_type}', '${data.check_in_date}', '${data.number_of_nights}', (SELECT RoomTypes.rate_per_night FROM RoomTypes INNER JOIN Rooms ON RoomTypes.room_type_id = Rooms.room_type_id WHERE room_id = ${data.room_id}) * ${data.number_of_nights}, '${data.guest_id}', '${data.room_id}', (SELECT RoomTypes.room_type_id FROM RoomTypes INNER JOIN Rooms ON RoomTypes.room_type_id = Rooms.room_type_id WHERE room_id = ${data.room_id}))`;
    
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM Bookings;';
            db.pool.query(query2, function(error,rows,fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/addEmployee', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO Employees (first_name, last_name, job_title, hourly_pay_rate) VALUES ('${data.first_name}', '${data.last_name}', '${data.job_title}', '${data.hourly_pay_rate}')`;
    
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM Employees;';
            db.pool.query(query2, function(error,rows,fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/addRoomType', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO RoomTypes (room_type_name, rate_per_night)
                VALUES ('${data.room_type_name}', '${data.rate_per_night}')`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM RoomTypes;';
            db.pool.query(query2, function(error,rows,fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/addEmployeeAssignment', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO EmployeesByRooms (room_id, employee_id)
                VALUES ('${data.room_id}', '${data.employee_id}')`;
    
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM EmployeesByRooms;';
            db.pool.query(query2, function(error,rows,fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/addRoom', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO Rooms (room_number, room_type_id)
                VALUES ('${data.room_number}', '${data.room_type_id}')`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM Rooms;';
            db.pool.query(query2, function(error,rows,fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    DELETE ROUTES
*/

app.delete('/deleteGuest', function(req,res){
    let data = req.body;
    let guest_id = parseInt(data.guest_id);
    let deleteGuestQuery = `DELETE FROM Guests WHERE guest_id = ${guest_id};`;
  
    db.pool.query(deleteGuestQuery, function(error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.delete('/deleteBooking', function(req,res){
    let data = req.body;
    let booking_id = parseInt(data.booking_id);
    let deleteBookingQuery = `DELETE FROM Bookings WHERE booking_id = ${booking_id};`;
  
    db.pool.query(deleteBookingQuery, function(error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.delete('/deleteRoom', function(req,res){
    let data = req.body;
    let room_id = parseInt(data.room_id);
    let deleteRoomQuery = `DELETE FROM Rooms WHERE room_id = ${room_id};`;
  
    db.pool.query(deleteRoomQuery, function(error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.delete('/deleteRoomType', function(req,res){
    let data = req.body;
    let room_type_id = parseInt(data.room_type_id);
    let deleteRoomTypeQuery = `DELETE FROM RoomTypes WHERE room_type_id = ${room_type_id};`;
  
    db.pool.query(deleteRoomTypeQuery, function(error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.delete('/deleteEmployee', function(req,res){
    let data = req.body;
    let employee_id = parseInt(data.employee_id);
    let deleteEmployeeQuery = `DELETE FROM Employees WHERE employee_id = ${employee_id};`;
  
    db.pool.query(deleteEmployeeQuery, function(error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.delete('/deleteEmployeeAssignment', function(req,res){
    let data = req.body;
    let employee_room_id = parseInt(data.employee_room_id);
    let deleteEmployeeAssignmentQuery = `DELETE FROM EmployeesByRooms WHERE employee_room_id = '${employee_room_id}'`;
  
    db.pool.query(deleteEmployeeAssignmentQuery, function(error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

/*
    PUT ROUTES
*/

app.put('/updateGuest', function(req, res, next){
    let data = req.body;

    let queryUpdateGuest = `UPDATE Guests 
                            SET first_name = '${data.first_name}', last_name = '${data.last_name}', email = '${data.email}', vip = '${data.vip}' 
                            WHERE guest_id = '${data.guest_id}';`

    let querySelectGuests = `SELECT * FROM Guests;`

    db.pool.query(queryUpdateGuest, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(querySelectGuests, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/updateBooking', function(req, res, next){
    let data = req.body;

    let queryUpdateBooking = `UPDATE Bookings
                            SET number_of_guests = ${data.number_of_guests}, bed_type = '${data.bed_type}', check_in_date = '${data.check_in_date}', number_of_nights = ${data.number_of_nights}, total_rate = (SELECT RoomTypes.rate_per_night FROM RoomTypes INNER JOIN Rooms ON RoomTypes.room_type_id = Rooms.room_type_id WHERE room_id = ${data.room_id}) * ${data.number_of_nights}, guest_id = ${data.guest_id}, room_id = ${data.room_id}, room_type_id = (SELECT RoomTypes.room_type_id FROM RoomTypes INNER JOIN Rooms ON RoomTypes.room_type_id = Rooms.room_type_id WHERE room_id = ${data.room_id})
                            WHERE booking_id = ${data.booking_id};`

    let querySelectBookings = `SELECT * FROM Bookings;`

    db.pool.query(queryUpdateBooking, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(querySelectBookings, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/updateEmployee', function(req, res, next){
    let data = req.body;

    let queryUpdateEmployee = `UPDATE Employees 
                            SET first_name = '${data.first_name}', last_name = '${data.last_name}', job_title = '${data.job_title}', hourly_pay_rate = '${data.hourly_pay_rate}' 
                            WHERE employee_id = '${data.employee_id}';`

    let querySelectEmployees = `SELECT * FROM Employees;`

    db.pool.query(queryUpdateEmployee, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(querySelectEmployees, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/updateRoomType', function(req, res, next){
    let data = req.body;

    let queryUpdateRoomType= `UPDATE RoomTypes
                            SET room_type_name = '${data.room_type_name}', rate_per_night = '${data.rate_per_night}'
                            WHERE room_type_id = '${data.room_type_id}';`

    let querySelectRoomTypes = `SELECT * FROM RoomTypes;`

    db.pool.query(queryUpdateRoomType, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(querySelectRoomTypes, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/updateRoom', function(req, res, next){
    let data = req.body;

    let queryUpdateRoom= `UPDATE Rooms
                            SET room_number = '${data.room_number}', room_type_id = '${data.room_type_id}'
                            WHERE room_id = '${data.room_id}';`

    let querySelectRoom = `SELECT * FROM Rooms;`

    db.pool.query(queryUpdateRoom, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(querySelectRoom, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/updateEmployeeAssignment', function(req, res, next){
    let data = req.body;

    let queryUpdateEmployeeAssignment = `UPDATE EmployeesByRooms
                                            SET room_id = '${data.room_id}', employee_id = '${data.employee_id}'
                                            WHERE employee_room_id = '${data.employee_room_id}';`

    let querySelectEmployeeAssignment = `SELECT * FROM EmployeesByRooms;`

    db.pool.query(queryUpdateEmployeeAssignment, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(querySelectEmployeeAssignment, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    LISTENER
    app is currently running forever at http://flip1.engr.oregonstate.edu:1913/
    enter "forever stop app.js" in terminal to end
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

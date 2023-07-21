// DB connection code to connect with MySql database hosted on Azure

var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit : 10,
    // acquireTimeout  : 100000,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB, 
    port            : process.env.PORT,
    // ssl             : process.env.SSL,
})

// Export 
module.exports.pool = pool;


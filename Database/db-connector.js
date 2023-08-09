// DB connection code to connect with MySql database hosted on Azure

// const mysql = require('mysql');
const Pool = require('pg').Pool
const pool = new Pool({
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB, 
    port            : process.env.DB_PORT,
})

// Export 
module.exports.pool = pool;


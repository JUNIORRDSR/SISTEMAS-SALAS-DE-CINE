const path = require('path');
require('dotenv').config();
const mysql = require('mysql2');


const pool = mysql.createPool({
    host: process.env.HOST_NAME,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Intento de conexion al servidor
pool.getConnection((error, connection) => {
    if (error) {
        console.log(error);
    } else {
        console.log('CONEXION EXITOSA');
        connection.release();
    }
});

// Prueba de consulta para confirmar el funcionamiento
pool.query('select * from Usuarios WHERE rol = "CAJERO";', (error, result) => {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
    }
});

module.exports = pool;

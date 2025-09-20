const env = require('dotenv').config();
const mysql = require('mysql2')

// Establecer variables de conexion para la base de dato
const conexion = mysql.createConnection({
    host: env.parsed['HOST_NAME'],
    database: env.parsed['MYSQL_DATABASE'],
    user: env.parsed['MYSQL_USER'],
    password: env.parsed['MYSQL_ROOT_PASSWORD']
})

// Intento de conexion al servidor
conexion.connect((error) =>{
    if(error){
        console.log(error)
    }else{
        console.log('CONEXION EXITOSA')
    }
})

// Prueba de consulta para confirmar el funcionamiento
conexion.query('select * from Clientes;', (error,result) =>{
    if(error){
        console.log(error)
    }else{
        console.log(result)
    }
})

conexion.end()

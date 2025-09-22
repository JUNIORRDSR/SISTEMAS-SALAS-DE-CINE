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


// Inserción correcta usando los campos reales de la tabla
conexion.query('INSERT INTO Clientes (nombre, email, telefono, tipo) VALUES ("Juan Perez", "juan.perez@example.com", "1234567890", "NORMAL")', (error, result) => {
    if (error) {
        console.log('Error en la inserción:', error)
    } else {
        console.log('✅ Inserción exitosa!')
        console.log('ID del cliente insertado:', result.insertId)
    }
})

// Luego vamos a ver qué datos hay en la tabla
conexion.query('SELECT * FROM Clientes;', (error,result) =>{
    if(error){
        console.log('Error al consultar clientes:', error)
    }else{
        console.log('Datos actuales en la tabla Clientes:')
        if(result.length > 0) {
            console.table(result)
        } else {
            console.log('No hay datos en la tabla')
        }
    }
})

conexion.end()

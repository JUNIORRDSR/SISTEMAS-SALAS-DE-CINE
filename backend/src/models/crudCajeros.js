const conexion = require('../../../database/test_conexion/conexiondb');


// Create (Insertar) un nuevo cajero

function createCajero(cajeroData, callback) {

    const query = 'INSERT INTO Usuarios (nombre, usuario, contraseña, rol, fecha_creacion) VALUES (?, ?, ?, ?, ?)'; 
    conexion.query(query, [cajeroData.nombre, cajeroData.usuario, cajeroData.contraseña, cajeroData.rol, cajeroData.fecha_creacion], (error, results) => {
        if (error) return callback(error, null);
        callback(null, { id: results.insertId, ...cajeroData });
    });
}


// Read (Obtener) todos los cajeros 
function getAllCajeros(callback) {
    const query = 'SELECT * FROM Usuarios WHERE rol = "CAJERO"';
    conexion.query(query, (error, results) => {
        if (error) return callback(error, null);
        callback(null, results);
    });
}


// Update (Actualizar) un cajero por ID 
function updateCajero(id, cajeroData, callback) { 
    const query = 'UPDATE Usuarios SET nombre = ?, usuario = ?, contraseña = ?, rol = ? WHERE id = ?';
    conexion.query(query, [cajeroData.nombre, cajeroData.usuario, cajeroData.contraseña, cajeroData.rol, id], (error, results) => {
        if (error) return callback(error, null);
        if (results.affectedRows === 0) return callback(new Error('Cajero no encontrado'), null);
        callback(null, { id, ...cajeroData });
    }); 

}
// Delete (Eliminar) un cajero por ID
function deleteCajero(id, callback) {
    const query = 'DELETE FROM Usuarios WHERE id = ?';   
    conexion.query(query, [id], (error, results) => {
        if (error) return callback(error, null);
        if (results.affectedRows === 0) return callback(new Error('Cajero no encontrado'), null);
        callback(null, true);
    });
}

console.log('CRUD de Cajeros cargado correctamente');


module.exports = {
    createCajero,
    getAllCajeros,
    updateCajero,
    deleteCajero
};
const mysql = require('mysql2');
const env = require('dotenv').config();

const conexion = mysql.createConnection({
  host: process.env.HOST_NAME,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD
});


// Crear cajero
const getAllCajeros = (req, res) => {
  conexion.query('SELECT * FROM Usuarios WHERE rol="CAJERO";', (error, results) => {
    if (error) {
      console.error('Error al obtener cajeros:', error);
      return res.status(500).json({ error: 'Error al obtener cajeros' });
    }
    res.json(results);
    console.log(results);
  });
};

const createCajero = (req, res) => {
  const { nombre, usuario, contraseña, rol, fecha_creacion } = req.body;
  conexion.query('INSERT INTO Usuarios (nombre, usuario, contraseña, rol, fecha_creacion) VALUES (?, ?, ?, ?, ?)', [nombre, usuario, contraseña, rol, fecha_creacion], (error, results) => {
    if (error) {
      console.error('Error al crear cajero:', error);
      return res.status(500).json({ error: 'Error al crear cajero' });
    }
    res.status(201).json({ message: 'Cajero creado exitosamente', id: results.insertId, nombre });
  });
};

const updateCajero = (req, res) => {

  const { id } = req.params;
  const id_parse = parseFloat(id);
  if (isNaN(id_parse)) {
    console.error('ID inválido:', id);
    return res.status(400).send('ID inválido');
  }
  const { nombre, usuario, contraseña, rol, fecha_creacion } = req.body;
  conexion.query('UPDATE Usuarios SET nombre = ?, usuario = ?, contraseña = ?, rol = ?, fecha_creacion = ? WHERE id = ?', [nombre, usuario, contraseña, rol, fecha_creacion, id_parse], (error, results) => {
    if (error) {
      console.error('Error al actualizar cajero:', error);
      return res.status(500).json({ error: 'Error al actualizar cajero' });
    }
    res.json({ message: 'Cajero actualizado exitosamente', id: id_parse, nombre });
  });
};

const deleteCajero = (req, res) => {
  const { id } = req.params;
  const id_parse = parseFloat(id);
  if (isNaN(id_parse)) {
    console.error('ID inválido:', id);
    return res.status(400).send('ID inválido');
  }
  conexion.query('DELETE FROM Usuarios WHERE id = ?', [id_parse], (error, results) => {
    if (error) {
      console.error('Error al eliminar cajero:', error);
      return res.status(500).json({ error: 'Error al eliminar cajero' });
    }
    res.json({ message: 'Cajero eliminado exitosamente', id: id_parse });
  });
};

module.exports = {
  getAllCajeros,
  createCajero,
  updateCajero,
  deleteCajero
};
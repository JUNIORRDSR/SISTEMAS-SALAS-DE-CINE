const mysql = require('mysql2');
const conexion = require('../../../database/conexion_db');

// Obtener todos los cajeros (rol CAJERO)
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

// POST crear un nuevo cajero
const createCajero = (req, res) => {
  const { nombre, usuario, contrasena, rol } = req.body;
  conexion.query('INSERT INTO Usuarios (nombre, usuario, contrasena, rol) VALUES (?, ?, ?, ?)', [nombre, usuario, contrasena, rol], (error, results) => {
    if (error) {
      console.error('Error al crear cajero:', error);
      return res.status(500).json({ error: 'Error al crear cajero' });
    }
    res.status(201).json({ message: 'Cajero creado exitosamente', id: results.insertId, nombre });
  });
};


//PUT actualizar un cajero existente
const updateCajero = (req, res) => {

  const { id } = req.params;
  const id_parse = parseFloat(id);
  if (isNaN(id_parse)) {
    console.error('ID inválido:', id);
    return res.status(400).send('ID inválido');
  }
  const { nombre, usuario, contrasena, rol } = req.body;
  conexion.query('UPDATE Usuarios SET nombre = ?, usuario = ?, contrasena = ?, rol = ? WHERE id_usuario = ?', [nombre, usuario, contrasena, rol, id_parse], (error, results) => {
    if (error) {
      console.error('Error al actualizar cajero:', error);
      return res.status(500).json({ error: 'Error al actualizar cajero' });
    }
    res.json({ message: 'Cajero actualizado exitosamente', id: id_parse, nombre });
  });
};


// DELETE eliminar un cajero existente
const deleteCajero = (req, res) => {
  const { id } = req.params;
  const id_parse = parseFloat(id);
  if (isNaN(id_parse)) {
    console.error('ID inválido:', id);
    return res.status(400).send('ID inválido');
  }
  conexion.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id_parse], (error, results) => {
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
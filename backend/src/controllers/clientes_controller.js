const mysql = require('mysql2');
const conexion = require('../../../database/conexion_db');

const getAllClientes = (req, res) => {
    conexion.query('SELECT * FROM Clientes;', (error, results) => {
        // console.log('Consulta ejecutada por: ', req);
        if (error) {
            console.error('Error al obtener clientes:', error);
            res.status(500).send('Error al obtener clientes');
        } else {
            res.json(results);
            console.log(results);
        }
    });
}

const createCliente = (req, res) => {
    const { nombre, email, telefono, tipo } = req.body;
    conexion.query('INSERT INTO Clientes (nombre, email, telefono, tipo) VALUES (?, ?, ?, ?)', [nombre, email, telefono, tipo], (error, results) => {
        if (error) {
            console.error('Error al crear cliente:', error);
            res.status(500).send('Error al crear cliente');
        } else {
            res.status(201).json({ id: results.insertId, nombre, email, telefono, tipo });
        }
    });
}

const updateCliente = (req, res) => {
    const { id } = req.params;
    const id_parse = parseFloat(id);
    if (isNaN(id_parse)) {
        console.error('ID inválido:', id);
        return res.status(400).send('ID inválido');
    }
    const { nombre, email, telefono, tipo } = req.body;
    conexion.query('UPDATE Clientes SET nombre = ?, email = ?, telefono = ?, tipo = ? WHERE id_cliente = ?', [nombre, email, telefono, tipo, id_parse], (error, results) => {
        if (error) {
            console.error('Error al actualizar cliente:', error);
            res.status(500).send('Error al actualizar cliente');
        } else {
            res.status(200).json({ id: id_parse, nombre, email, telefono, tipo });
            console.log('Cliente actualizado:', { id: id_parse, nombre, email, telefono, tipo });
        }
    });
}

const deleteCliente = (req, res) => {
    const { id } = req.params;
    const id_parse = parseFloat(id);
    if (isNaN(id_parse)) {
        console.error('ID inválido:', id);
        return res.status(400).send('ID inválido');
    }
    conexion.query('DELETE FROM Clientes WHERE id_cliente = ?', [id_parse], (error, results) => {
        if (error) {
            console.error('Error al eliminar cliente:', error);
            res.status(500).send('Error al eliminar cliente');
        } else {
            res.status(204).send();
            console.log('Cliente eliminado:', id_parse);
        }
    });
}


module.exports = { getAllClientes, createCliente, updateCliente, deleteCliente };
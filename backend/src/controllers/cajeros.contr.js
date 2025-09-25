const model = require('../models/cajerosModel');

// Crear cajero
exports.crear = (req, res) => {
  model.insertarCajero(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al insertar cajero' });
    res.json(result);
  });
};

// Consultar cajeros
exports.listar = (req, res) => {
  model.obtenerCajeros((err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener cajeros' });
    res.json(results);
  });
};

// Actualizar cajero
exports.actualizar = (req, res) => {
  model.actualizarCajero(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar cajero' });
    res.json(result);
  });
};

// Eliminar cajero
exports.eliminar = (req, res) => {
  model.eliminarCajero(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar cajero' });
    res.json(result);
  });
};

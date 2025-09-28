const express = require('express');

const clientesController = require('../controllers/clientes_controllers');
const conexion = require('../../../database/test_conexion/conexiondb');

const router = express.Router();


// Rutas para gestionar clientes

router.get('/clientes', clientesController.getAllClientes);
router.post('/clientes', clientesController.createCliente);
router.put('/clientes/:id', clientesController.updateCliente);
router.delete('/clientes/:id', clientesController.deleteCliente);

console.log('Clientes Rutas Activas');



module.exports = router;

// Nota: Asegúrate de que el controlador 'clientesController' tenga los métodos 'getAllClientes', 'createCliente', 'updateCliente' y 'deleteCliente' implementados correctamente.
const express = require('express');
const cajerosController = require('../controllers/cajeros_controllers');
const router = express.Router();


// Rutas para gestionar cajeros
router.get('/cajeros', cajerosController.getAllCajeros);
router.post('/cajeros', cajerosController.createCajero);
router.put('/cajeros/:id', cajerosController.updateCajero);
router.delete('/cajeros/:id', cajerosController.deleteCajero);

console.log('Cajeros Rutas Activas');
module.exports = router;

// Nota: Asegúrate de que el controlador 'cajerosController' tenga los métodos 'getAllCajeros', 'createCajero', 'updateCajero' y 'deleteCajero' implementados correctamente.
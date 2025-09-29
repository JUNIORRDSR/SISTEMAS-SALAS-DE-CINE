const express = require('express');
const cajerosController = require('../controllers/cajeros_controllers');
const router = express.Router();



// Rutas para gestionar cajeros

router.get('/', cajerosController.getAllCajeros);
router.post('/', cajerosController.createCajero);
router.put('/:id', cajerosController.updateCajero);
router.delete('/:id', cajerosController.deleteCajero);


console.log('Cajeros routes loaded');
module.exports = router;


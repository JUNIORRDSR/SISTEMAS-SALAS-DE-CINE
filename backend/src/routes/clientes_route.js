const express = require('express');
const clientesController = require('../controllers/clientes_controller');
const router = express.Router();

router.get('/', clientesController.getAllClientes);
router.post('/', clientesController.createCliente);
router.put('/:id', clientesController.updateCliente);
router.delete('/:id', clientesController.deleteCliente);
module.exports = router;
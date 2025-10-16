const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculas_controller');

router.get('/', peliculasController.getAllPeliculas);
router.get('/:id', peliculasController.getPeliculaById);
router.post('/', peliculasController.create);
router.put('/:id', peliculasController.update);
router.delete('/:id', peliculasController.delete);

module.exports = router;

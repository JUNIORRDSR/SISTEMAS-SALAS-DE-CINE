const PeliculaService = new (require("../services/PeliculaService"))();

exports.getAllPeliculas = async (req, res) => {
  try {
    const peliculas = await PeliculaService.getAllPeliculas();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPeliculaById = async (req, res) => {
  try {
    const pelicula = await PeliculaService.getPeliculaById(req.params.id);
    res.json(pelicula);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nueva = await PeliculaService.createPelicula(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const actualizada = await PeliculaService.updatePelicula(req.params.id, req.body);
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await PeliculaService.deletePelicula(req.params.id);
    res.json({ message: "Película eliminada" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

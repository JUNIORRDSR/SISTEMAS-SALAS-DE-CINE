const Pelicula = require('../models/peliculas');

class PeliculaService {

  async getAllPeliculas() {
    return await Pelicula.getAllPeliculas();
  }

  async getPeliculaById(id) {
    const pelicula = await Pelicula.getById(id);
    if (!pelicula) {
      throw new Error('Pelicula no Encontrada');
    }
    return pelicula;
  }

  async createPelicula(data) {
    const existePelicula = await Pelicula.getById(data.id);
    const existeNombre = await Pelicula.getById(data.titulo);
    if (existePelicula || existeNombre) {
      throw new Error('La Pelicula ya Existe');
    }
    if (typeof data.duracion !== 'number' || data.duracion <= 0) {
      throw new Error('La duración debe ser un número positivo.');
    }
    if (!data.titulo || !data.duracion) {
      throw new Error('Faltan datos obligatorios: titulo y duracion.');
    }
    return await Pelicula.create(data);
  }

  async updatePelicula(id, data) {
    const existePelicula = await Pelicula.getById(id);
    if (!existePelicula) {
      throw new Error('La Pelicula no Existe');
    }
    return await Pelicula.update(id, data);
  }

  async deletePelicula(id) {
    const existePelicula = await Pelicula.getById(id);
    if (!existePelicula) {
      throw new Error('La Pelicula no Existe');
    }
    return await Pelicula.delete(id);
  }
}

module.exports = PeliculaService;
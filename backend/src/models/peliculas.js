const mysql = require('mysql2');
const pool = require('../../../database/conexion_db');

class Pelicula {
  constructor({ titulo, duracion, genero, clasificacion, sinopsis, director, actores, estado }) {
    this.titulo = titulo;
    this.genero = genero;
    this.duracion = duracion;
    this.clasificacion = clasificacion;
    this.sinopsis = sinopsis;
    this.director = director;
    this.actores = actores;
    this.estado = estado;
  } 
 
  static async getAllPeliculas() {
    const [rows] = await pool.query("SELECT * FROM Peliculas");
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM Peliculas WHERE id_pelicula = ? or titulo = ?", [id, id]);
    return rows[0];
  }

  static async create(data) {
    const { titulo, duracion, genero, clasificacion, sinopsis, director, actores } = data;
    const [result] = await pool.query(
      `INSERT INTO Peliculas (titulo, duracion, genero, clasificacion, sinopsis, director, actores)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [titulo, duracion, genero, clasificacion, sinopsis, director, actores]
    );
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    const { titulo, duracion, genero, clasificacion, sinopsis, director, actores } = data;
    await pool.query(
      `UPDATE Peliculas SET titulo=?, duracion=?, genero=?, clasificacion=?, sinopsis=?, director=?, actores=? WHERE id_pelicula=?`,
      [titulo, duracion, genero, clasificacion, sinopsis, director, actores, id]
    );
    return { id, ...data };
  }

  static async delete(id) {
    await pool.query("DELETE FROM Peliculas WHERE id_pelicula = ?", [id]);
    return { deleted: true };
  }
}


module.exports = Pelicula;
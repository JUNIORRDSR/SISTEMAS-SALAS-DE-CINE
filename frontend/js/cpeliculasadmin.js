// FUNCIONALIDAD DEL FORMULARIO

// Se obtienen los elementos del DOM (HTML) que se van a manipular
const uploadBox = document.getElementById('uploadBox'); // Cuadro donde se mostrará la imagen o el ícono de subir
const inputImagen = document.getElementById('imagen');   // Input oculto para seleccionar archivos de imagen
const btnActivo = document.getElementById('btnActivo');   // Botón para marcar la película como activa
const btnInactivo = document.getElementById('btnInactivo'); // Botón para marcar la película como inactiva

// Variable para guardar el estado de la película
let estado = "Activo"; // Por defecto el estado inicial es “Activo”

// SUBIR IMAGEN

// Cuando el usuario hace clic en el cuadro de carga (uploadBox),
// se simula un clic en el input file oculto, para abrir el explorador de archivos.
uploadBox.addEventListener('click', () => inputImagen.click());

// Cuando el usuario selecciona una imagen, se activa este evento
inputImagen.addEventListener('change', (e) => {
  const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
  if (file) { // Si existe un archivo...
    const reader = new FileReader(); // Crea un lector de archivos
    // Cuando el archivo se termina de leer, se ejecuta esta función
    reader.onload = (event) => {
      // Reemplaza el contenido del cuadro con la vista previa de la imagen cargada
      uploadBox.innerHTML = `
        <img src="${event.target.result}" 
             alt="Vista previa" 
             style="max-height:140px; border-radius:8px;">
      `;
    };
    // Lee el archivo como una URL base64 para mostrarlo en pantalla 
    reader.readAsDataURL(file);
  }
});

// CAMBIAR ESTADO ACTIVO / INACTIVO

// Si el usuario hace clic en el botón "Activo"
btnActivo.addEventListener('click', () => {
  estado = "Activo"; // Cambia el valor de la variable de estado
  // Cambia las clases CSS para mostrar visualmente cuál botón está activo
  btnActivo.classList.add('activo');
  btnActivo.classList.remove('inactivo');

  btnInactivo.classList.add('inactivo');
  btnInactivo.classList.remove('activo');
});

// Si el usuario hace clic en el botón "Inactivo"
btnInactivo.addEventListener('click', () => {
  estado = "Inactivo"; // Cambia el valor de la variable de estado
  // Cambia las clases CSS para actualizar el aspecto visual de los botones
  btnInactivo.classList.add('activo');
  btnInactivo.classList.remove('inactivo');

  btnActivo.classList.add('inactivo');
  btnActivo.classList.remove('activo');
});

// ENVÍO DEL FORMULARIO

// Escucha el evento "submit" (cuando se presiona el botón "Crear")
document.getElementById('formPelicula').addEventListener('submit', (e) => {
  e.preventDefault(); // Evita que la página se recargue automáticamente

  // Crea un objeto con los datos ingresados por el usuario
  const pelicula = {
    nombre: document.getElementById('nombre').value,
    genero: document.getElementById('genero').value,
    duracion: document.getElementById('duracion').value,
    estado: estado // Usa el valor de la variable "estado" (Activo o Inactivo)
  };

  // Muestra en consola los datos de la película creada
  console.log("Película creada:", pelicula);

  // Muestra un mensaje de confirmación
  alert("Película registrada con éxito ");

  // Limpia el formulario para poder ingresar otra película
  e.target.reset();

  // Restaura el cuadro de carga con el ícono original
  uploadBox.innerHTML = '<img src="../assets/img/subir.svg" alt="Subir imagen">';
});

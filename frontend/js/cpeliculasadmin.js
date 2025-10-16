 
    // ===============================
    // FUNCIONALIDAD DEL FORMULARIO
    // ===============================

    const uploadBox = document.getElementById('uploadBox');
    const inputImagen = document.getElementById('imagen');
    const btnActivo = document.getElementById('btnActivo');
    const btnInactivo = document.getElementById('btnInactivo');
    let estado = "Activo";

    // Simular click en input file
    uploadBox.addEventListener('click', () => inputImagen.click());

    // Mostrar vista previa de la imagen
    inputImagen.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          uploadBox.innerHTML = `<img src="${event.target.result}" alt="Vista previa" style="max-height:140px; border-radius:8px;">`;
        };
        reader.readAsDataURL(file);
      }
    });

  // Cambiar estado activo / inactivo
btnActivo.addEventListener('click', () => {
  estado = "Activo";
  btnActivo.classList.add('activo');
  btnActivo.classList.remove('inactivo');

  btnInactivo.classList.add('inactivo');
  btnInactivo.classList.remove('activo');
});

btnInactivo.addEventListener('click', () => {
  estado = "Inactivo";
  btnInactivo.classList.add('activo');
  btnInactivo.classList.remove('inactivo');

  btnActivo.classList.add('inactivo');
  btnActivo.classList.remove('activo');
});


    // Manejar envío del formulario
    document.getElementById('formPelicula').addEventListener('submit', (e) => {
      e.preventDefault();
      const pelicula = {
        nombre: document.getElementById('nombre').value,
        genero: document.getElementById('genero').value,
        duracion: document.getElementById('duracion').value,
        estado: estado
      };
      console.log("🎬 Película creada:", pelicula);
      alert("Película registrada con éxito 🎉");
      e.target.reset();
      uploadBox.innerHTML = '<img src="../assets/img/subir.svg" alt="Subir imagen">';
    });

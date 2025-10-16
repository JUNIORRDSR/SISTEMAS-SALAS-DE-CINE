// OBTENER ELEMENTOS DEL DOM

// Botón que abre el modal para crear un nuevo cajero
const openModalBtn = document.getElementById("openModalBtn");

// Formulario dentro del modal de creación/edición
const cajeroForm = document.getElementById("cajeroForm");

// Cuerpo (<tbody>) de la tabla donde se mostrarán los cajeros
const cajerosTable = document.getElementById("cajerosTable").querySelector("tbody");

// Modal para agregar o editar cajeros
const cajeroModal = new bootstrap.Modal(document.getElementById("cajeroModal"));

// Modal para visualizar los datos de un cajero
const viewModal = new bootstrap.Modal(document.getElementById("viewModal"));

// Variable auxiliar para saber si estamos editando un cajero existente
let editingRow = null;

//ABRIR EL MODAL DE CREACIÓN

openModalBtn.addEventListener("click", () => {
  editingRow = null;          // Reiniciamos el estado de edición
  cajeroForm.reset();         // Limpiamos los campos del formulario
  cajeroModal.show();         // Mostramos el modal con Bootstrap
});

// GUARDAR CAJERO (CREAR O EDITAR)

cajeroForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que el formulario recargue la página

  // Obtener los valores ingresados en el formulario
  const nombre = document.getElementById("nombre").value;
  const usuario = document.getElementById("usuario").value;
  const correo = document.getElementById("correo").value;
  const contraseña = document.getElementById("contraseña").value;
  const estado = document.getElementById("estado").value;

  // Si se está editando una fila existente...
  if (editingRow) {
    // Actualiza los datos de esa fila con los nuevos valores
    editingRow.cells[0].textContent = nombre;
    editingRow.cells[1].textContent = usuario;
    editingRow.cells[2].textContent = correo;
    editingRow.cells[3].textContent = contraseña;
    editingRow.cells[4].innerHTML = `
      <span class="badge ${estado === "Activo" ? "bg-success" : "bg-danger"}">${estado}</span>
    `;
    editingRow = null; // Sale del modo edición

  } else {
   
    //  CREAR UNA NUEVA FILA (si no se está editando)
    const row = document.createElement("tr"); // Crear una nueva fila de la tabla

    // Insertar los datos dentro de la fila
    row.innerHTML = `
      <td>${nombre}</td>
      <td>${usuario}</td>
      <td>${correo}</td>
      <td>${contraseña}</td>
      <td>
        <span class="badge ${estado === "Activo" ? "bg-success" : "bg-danger"}">${estado}</span>
      </td>
      <td>
        <!-- Botones de acción -->
        <div class="d-flex gap-1">
          <!-- Ver -->
          <button type="button" class="btn btn-sm btn-outline-primary btn-view">
            <img src="../assets/img/ver.svg" width="18" alt="Ver">
          </button>
          <!-- Editar -->
          <button type="button" class="btn btn-sm btn-outline-warning btn-edit">
            <img src="../assets/img/editar.svg" width="18" alt="Editar">
          </button>
          <!-- Eliminar -->
          <button type="button" class="btn btn-sm btn-outline-danger btn-delete">
            <img src="../assets/img/eliminar.svg" width="18" alt="Eliminar">
          </button>
        </div>
      </td>
    `;

      //  CONFIGURAR LOS BOTONES DE LA FILA
    // Botón "Ver": muestra los datos del cajero en el modal de vista
    row.querySelector(".btn-view").addEventListener("click", () => {
      document.getElementById("viewNombre").textContent = nombre;
      document.getElementById("viewUsuario").textContent = usuario;
      document.getElementById("viewCorreo").textContent = correo;
      document.getElementById("viewContraseña").textContent = contraseña;
      document.getElementById("viewEstado").textContent = estado;
      viewModal.show(); // Abre el modal de vista
    });

    // Botón "Editar": llena el formulario con los datos de la fila
    row.querySelector(".btn-edit").addEventListener("click", () => {
      document.getElementById("nombre").value = row.cells[0].textContent;
      document.getElementById("usuario").value = row.cells[1].textContent;
      document.getElementById("correo").value = row.cells[2].textContent;
      document.getElementById("contraseña").value = row.cells[3].textContent;
      document.getElementById("estado").value = estado; // Rellena el select con el estado actual
      editingRow = row; // Marca que estamos editando esta fila
      cajeroModal.show(); // Muestra el modal con los datos cargados
    });

    // Botón "Eliminar": borra la fila tras confirmación
    row.querySelector(".btn-delete").addEventListener("click", () => {
      if (confirm(`¿Seguro que deseas eliminar este cajero?`)) {
        row.remove(); // Elimina la fila de la tabla
      }
    });

    // Añadir la nueva fila al cuerpo de la tabla
    cajerosTable.appendChild(row);
  }

  // Limpiar el formulario y cerrar el modal
  cajeroForm.reset();
  cajeroModal.hide(); // Cierra correctamente el modal de Bootstrap
});

// BÚSQUEDA DE CAJEROS

document.getElementById("searchInput").addEventListener("keyup", function () {
  const filter = this.value.toLowerCase(); // Convierte el texto a minúsculas para comparar
  const rows = cajerosTable.getElementsByTagName("tr"); // Todas las filas existentes

  // Recorre todas las filas y oculta las que no coincidan
  for (let row of rows) {
    const text = row.textContent.toLowerCase(); // Texto completo de la fila
    row.style.display = text.includes(filter) ? "" : "none"; // Muestra solo las que coincidan
  }
});

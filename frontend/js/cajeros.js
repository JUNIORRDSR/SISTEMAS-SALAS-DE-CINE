const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const cajeroModal = document.getElementById("cajeroModal");
const cajeroForm = document.getElementById("cajeroForm");
const cajerosTable = document.getElementById("cajerosTable").querySelector("tbody");

let editingRow = null; // Variable para saber si estoy editando

// Abrir modal
openModalBtn.addEventListener("click", () => {
  cajeroModal.style.display = "flex";
  editingRow = null; 
  cajeroForm.reset();
});

// Cerrar modal
closeModalBtn.addEventListener("click", () => cajeroModal.style.display = "none");
cancelBtn.addEventListener("click", () => cajeroModal.style.display = "none");

// Guardar cajero (crear o editar)
cajeroForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const usuario = document.getElementById("usuario").value;
  const correo = document.getElementById("correo").value;
  const contraseña= document.getElementById("contraseña").value;
  const estado = document.getElementById("estado").value;

  if (editingRow) {
    // Editar fila existente
    editingRow.cells[0].textContent = nombre;
    editingRow.cells[1].textContent = usuario;
    editingRow.cells[2].textContent = correo;
    editingRow.cells[3].textContent = contraseña;
    editingRow.cells[4].innerHTML = `
      <span class="status-badge ${estado === "Activo" ? "status-active" : "status-inactive"}">
        <span class="status-dot"></span> ${estado}
      </span>
    `;
    editingRow = null; // Termino de editar
  } else {
    // Crear nueva fila
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="text-muted">${nombre}</td>
      <td class="text-muted">${usuario}</td>
      <td class="text-muted">${correo}</td>
     <td class="text-muted">${contraseña}</td>
      <td>
        <span class="status-badge ${estado === "Activo" ? "status-active" : "status-inactive"}">
          <span class="status-dot"></span> ${estado}
        </span>
      </td>
      <td>
        <div class="action-buttons">
          <button type="button" class="action-btn btn-view"><img src="../assets/img/ver.svg" alt="Ver"></button>
          <button type="button" class="action-btn btn-edit"><img src="../assets/img/editar.svg" alt="Editar"></button>
          <button type="button" class="action-btn btn-delete"><img src="../assets/img/eliminar.svg" alt="Eliminar"></button>
        </div>
      </td>
    `;

    // Eventos de acción
    const btnView = row.querySelector(".btn-view");
    const btnEdit = row.querySelector(".btn-edit");
    const btnDelete = row.querySelector(".btn-delete");

 //boton vista
  btnView.addEventListener("click", () => {
  const currentNombre = row.cells[0].textContent;
  const currentUsuario = row.cells[1].textContent;
  const currentCorreo = row.cells[2].textContent;
  const currentContraseña= row.cells[3].textContent; 
  const currentEstado = row.cells[4].innerText.trim();

  // Llenar modal de vista
  document.getElementById("viewNombre").textContent = currentNombre;
  document.getElementById("viewUsuario").textContent = currentUsuario;
  document.getElementById("viewCorreo").textContent = currentCorreo;
  document.getElementById("viewContraseña").textContent = currentContraseña;
  document.getElementById("viewEstado").textContent = currentEstado;
 

  // Mostrar modal
  document.getElementById("viewModal").style.display = "flex";
});

// Cerrar modal de vista
document.getElementById("closeViewBtn").addEventListener("click", () => {
  document.getElementById("viewModal").style.display = "none";
});
// Cerrar modal de vista con el botón del footer
document.getElementById("closeViewFooterBtn").addEventListener("click", () => {
  document.getElementById("viewModal").style.display = "none";
});

//boton editar
    btnEdit.addEventListener("click", () => {
  

      document.getElementById("nombre").value = row.cells[0].textContent;
      document.getElementById("usuario").value = row.cells[1].textContent;
      document.getElementById("correo").value = row.cells[2].textContent;
       document.getElementById("contraseña").value = row.cells[1].textContent;
      document.getElementById("estado").value = estado;

      cajeroModal.style.display = "flex";
      editingRow = row; // Guardamos qué fila se está editando
    });

    btnDelete.addEventListener("click", () => {
      if (confirm(`¿Seguro que deseas eliminar este cajero?`)) {
        row.remove();
      }
    });

    // Insertar fila
    cajerosTable.appendChild(row);
  }

  // Limpiar y cerrar modal
  cajeroForm.reset();
  cajeroModal.style.display = "none";

});

// busqueda de cajeros
document.getElementById("searchInput").addEventListener("keyup", function() {
  const filter = this.value.toLowerCase();
  const table = document.getElementById("cajerosTable");
  const rows = table.getElementsByTagName("tr");

  // Recorremos todas las filas menos la cabecera
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    let match = false;

    // Recorre cada celda de la fila
    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].textContent.toLowerCase();
      if (cellText.includes(filter)) {
        match = true;
        break;
      }
    }

    // Muestra u oculta la fila según haya coincidencia
    row.style.display = match ? "" : "none";
  }
});


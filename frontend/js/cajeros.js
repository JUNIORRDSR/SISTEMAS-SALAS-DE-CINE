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
  editingRow = null; // siempre que abro con "crear", me aseguro de no estar editando
  cajeroForm.reset();
});

// Cerrar modal
closeModalBtn.addEventListener("click", () => cajeroModal.style.display = "none");
cancelBtn.addEventListener("click", () => cajeroModal.style.display = "none");

// Guardar cajero (crear o editar)
cajeroForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("cajeroId").value;
  const nombre = document.getElementById("nombre").value;
  const usuario = document.getElementById("usuario").value;
  const estado = document.getElementById("estado").value;

  if (editingRow) {
    // Editar fila existente
    editingRow.cells[0].textContent = "#" + id;
    editingRow.cells[1].textContent = nombre;
    editingRow.cells[2].textContent = usuario;
    editingRow.cells[3].innerHTML = `
      <span class="status-badge ${estado === "Activo" ? "status-active" : "status-inactive"}">
        <span class="status-dot"></span> ${estado}
      </span>
    `;
    editingRow = null; // Termino de editar
  } else {
    // Crear nueva fila
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>#${id}</td>
      <td class="text-muted">${nombre}</td>
      <td class="text-muted">${usuario}</td>
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

 btnView.addEventListener("click", () => {
  const currentId = row.cells[0].textContent.replace("#", "");
  const currentNombre = row.cells[1].textContent;
  const currentUsuario = row.cells[2].textContent;
  const currentEstado = row.cells[3].innerText.trim();

  // Llenar modal de vista
  document.getElementById("viewId").textContent = currentId;
  document.getElementById("viewNombre").textContent = currentNombre;
  document.getElementById("viewUsuario").textContent = currentUsuario;
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




    btnEdit.addEventListener("click", () => {
  
      document.getElementById("cajeroId").value = row.cells[0].textContent.replace("#", "");
      document.getElementById("nombre").value = row.cells[1].textContent;
      document.getElementById("usuario").value = row.cells[2].textContent;
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

const formCliente = document.getElementById("formCliente");
const tablaClientes = document.querySelector("#tablaClientes tbody");
const rangoResultados = document.getElementById("rango-resultados");
const paginacion = document.getElementById("paginacion");

let clientes = [];
let clienteEditando = null;

// 🔹 Variables de paginación
let paginaActual = 1;
const clientesPorPagina = 5;

// 🔸 Evento principal del formulario
formCliente.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoCliente = {
    nombre: formCliente.nombre.value,
    correo: formCliente.correo.value,
    telefono: formCliente.telefono.value,
    estado: formCliente.estado.value,
  };

  if (clienteEditando !== null) {
    clientes[clienteEditando] = nuevoCliente;
    clienteEditando = null;
  } else {
    clientes.push(nuevoCliente);
  }

  renderTabla();
  formCliente.reset();
  bootstrap.Modal.getInstance(document.getElementById("modalCliente")).hide();
});

// 🔹 Renderizar tabla con paginación
function renderTabla() {
  tablaClientes.innerHTML = "";

  // Calcular rangos
  const inicio = (paginaActual - 1) * clientesPorPagina;
  const fin = inicio + clientesPorPagina;
  const clientesPagina = clientes.slice(inicio, fin);

  clientesPagina.forEach((cliente, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${cliente.nombre}</td>
      <td>${cliente.correo}</td>
      <td>${cliente.telefono}</td>
      <td>
        <span class="badge ${
          cliente.estado === "Activo"
            ? "bg-success"
            : cliente.estado === "Pendiente"
            ? "bg-warning text-dark"
            : "bg-secondary"
        }">${cliente.estado}</span>
      </td>
      <td>
        <button class="btn btn-sm btn-outline-success me-1" onclick="editarCliente(${inicio + index})">
          <img src="../assets/img/editar.svg" alt="Editar">
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarCliente(${inicio + index})">
          <img src="../assets/img/eliminar.svg" alt="Eliminar">
        </button>
      </td>
    `;
    tablaClientes.appendChild(fila);
  });

  // Actualizar texto de resultados
  const total = clientes.length;
  const rangoInicio = total === 0 ? 0 : inicio + 1;
  const rangoFin = Math.min(fin, total);
  rangoResultados.textContent = `Mostrando ${rangoInicio}-${rangoFin} de ${total} resultados`;

  renderPaginacion();
}

// 🔹 Renderizar botones de paginación
function renderPaginacion() {
  paginacion.innerHTML = "";
  const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === paginaActual) li.classList.add("active");

    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener("click", () => {
      paginaActual = i;
      renderTabla();
    });

    paginacion.appendChild(li);
  }
}

//Editar cliente
function editarCliente(index) {
  const cliente = clientes[index];
  formCliente.nombre.value = cliente.nombre;
  formCliente.correo.value = cliente.correo;
  formCliente.telefono.value = cliente.telefono;
  formCliente.estado.value = cliente.estado;

  clienteEditando = index;

  document.getElementById("tituloModal").textContent = "Editar Cliente VIP";
  const modal = new bootstrap.Modal(document.getElementById("modalCliente"));
  modal.show();
}

// 🔹 Eliminar cliente
function eliminarCliente(index) {
  if (confirm("¿Deseas eliminar este cliente?")) {
    clientes.splice(index, 1);

    // Si eliminas el último registro de la última página, retrocede una
    const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);
    if (paginaActual > totalPaginas) paginaActual = totalPaginas || 1;

    renderTabla();
  }
}

// Inicializar tabla vacía
renderTabla();

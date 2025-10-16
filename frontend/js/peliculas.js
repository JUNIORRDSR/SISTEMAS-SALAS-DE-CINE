  // Datos de películas (simulando base de datos)
        let peliculas = [
            {
                id: 1,
                nombre: "Avatar: El Camino del Agua",
                genero: "Ciencia Ficción",
                duracion: 192,
                estado: true
            },
            {
                id: 2,
                nombre: "Top Gun: Maverick",
                genero: "Acción",
                duracion: 131,
                estado: true
            },
            {
                id: 3,
                nombre: "Black Panther: Wakanda Forever",
                genero: "Superhéroes",
                duracion: 161,
                estado: false
            },
            {
                id: 4,
                nombre: "Minions: El Origen de Gru",
                genero: "Animación",
                duracion: 87,
                estado: true
            }
        ];

        let nextId = 5;
        let editingId = null;

        // Cargar películas en la tabla
        function loadMovies() {
            const tbody = document.getElementById('tablaPeliculasBody');
            
            if (peliculas.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" class="empty-state">
                            <div class="empty-state-icon">🎬</div>
                            <div>No hay películas registradas</div>
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = peliculas.map(pelicula => `
                <tr>
                    <td class="checkbox-cell">
                        <input type="checkbox" class="movie-checkbox" value="${pelicula.id}" onchange="updateButtons()">
                    </td>
                    <td>${String(pelicula.id).padStart(3, '0')}</td>
                    <td>${pelicula.nombre}</td>
                    <td>${pelicula.genero}</td>
                    <td>${pelicula.duracion} min</td>
                    <td>
                        <span class="status-badge ${pelicula.estado ? 'status-activo' : 'status-inactivo'}">
                            ${pelicula.estado ? 'Activo' : 'Inactivo'}
                        </span>
                    </td>
                </tr>
            `).join('');
        }

        // Seleccionar todas las películas
        function toggleSelectAll() {
            const selectAll = document.getElementById('selectAll');
            const checkboxes = document.querySelectorAll('.movie-checkbox');
            checkboxes.forEach(cb => cb.checked = selectAll.checked);
            updateButtons();
        }

        // Actualizar estado de botones
        function updateButtons() {
            const checkboxes = document.querySelectorAll('.movie-checkbox:checked');
            const count = checkboxes.length;
            
            document.getElementById('btnEditar').disabled = count !== 1;
            document.getElementById('btnEliminar').disabled = count === 0;
            document.getElementById('btnConsultar').disabled = count !== 1;
        }

        // Abrir modal de crear
        function openCreateModal() {
            editingId = null;
            document.getElementById('modalTitle').textContent = 'Crear Película';
            document.getElementById('movieForm').reset();
            document.getElementById('movieStatus').checked = true;
            document.getElementById('movieModal').classList.add('show');
        }

        // Abrir modal de editar
        function openEditModal() {
            const selected = document.querySelector('.movie-checkbox:checked');
            if (!selected) return;

            const id = parseInt(selected.value);
            const pelicula = peliculas.find(p => p.id === id);
            
            if (!pelicula) return;

            editingId = id;
            document.getElementById('modalTitle').textContent = 'Editar Película';
            document.getElementById('movieId').value = id;
            document.getElementById('movieName').value = pelicula.nombre;
            document.getElementById('movieGenre').value = pelicula.genero;
            document.getElementById('movieDuration').value = pelicula.duracion;
            document.getElementById('movieStatus').checked = pelicula.estado;
            document.getElementById('movieModal').classList.add('show');
        }

        // Cerrar modal
        function closeModal() {
            document.getElementById('movieModal').classList.remove('show');
            document.getElementById('movieForm').reset();
            editingId = null;
        }

        // Ver detalles
        function viewSelected() {
            const selected = document.querySelector('.movie-checkbox:checked');
            if (!selected) return;

            const id = parseInt(selected.value);
            const pelicula = peliculas.find(p => p.id === id);
            
            if (!pelicula) return;

            const details = `
                <div style="padding: 20px 0;">
                    <div style="margin-bottom: 16px;">
                        <strong style="color: #6b7280;">ID:</strong>
                        <div style="margin-top: 4px;">${String(pelicula.id).padStart(3, '0')}</div>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong style="color: #6b7280;">Nombre:</strong>
                        <div style="margin-top: 4px;">${pelicula.nombre}</div>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong style="color: #6b7280;">Género:</strong>
                        <div style="margin-top: 4px;">${pelicula.genero}</div>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong style="color: #6b7280;">Duración:</strong>
                        <div style="margin-top: 4px;">${pelicula.duracion} minutos</div>
                    </div>
                    <div>
                        <strong style="color: #6b7280;">Estado:</strong>
                        <div style="margin-top: 4px;">
                            <span class="status-badge ${pelicula.estado ? 'status-activo' : 'status-inactivo'}">
                                ${pelicula.estado ? 'Activo' : 'Inactivo'}
                            </span>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('movieDetails').innerHTML = details;
            document.getElementById('viewModal').classList.add('show');
        }

        function closeViewModal() {
            document.getElementById('viewModal').classList.remove('show');
        }

        // Eliminar películas seleccionadas
        function deleteSelected() {
            const checkboxes = document.querySelectorAll('.movie-checkbox:checked');
            if (checkboxes.length === 0) return;

            const count = checkboxes.length;
            const message = count === 1 
                ? '¿Estás seguro de eliminar esta película?' 
                : `¿Estás seguro de eliminar ${count} películas?`;

            if (!confirm(message)) return;

            const ids = Array.from(checkboxes).map(cb => parseInt(cb.value));
            peliculas = peliculas.filter(p => !ids.includes(p.id));
            
            document.getElementById('selectAll').checked = false;
            loadMovies();
            updateButtons();
        }

        // Guardar película (crear o editar)
        document.getElementById('movieForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('movieName').value.trim();
            const genero = document.getElementById('movieGenre').value;
            const duracion = parseInt(document.getElementById('movieDuration').value);
            const estado = document.getElementById('movieStatus').checked;

            if (!nombre || !genero || !duracion) {
                alert('Por favor completa todos los campos obligatorios');
                return;
            }

            if (editingId) {
                // Editar película existente
                const pelicula = peliculas.find(p => p.id === editingId);
                if (pelicula) {
                    pelicula.nombre = nombre;
                    pelicula.genero = genero;
                    pelicula.duracion = duracion;
                    pelicula.estado = estado;
                }
            } else {
                // Crear nueva película
                peliculas.push({
                    id: nextId++,
                    nombre,
                    genero,
                    duracion,
                    estado
                });
            }

            closeModal();
            loadMovies();
            updateButtons();
        });

        // Cerrar modales al hacer clic fuera
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.classList.remove('show');
            }
        }

        // Cargar películas al iniciar
        loadMovies();
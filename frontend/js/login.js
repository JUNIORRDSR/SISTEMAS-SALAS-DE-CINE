// --- Validación del formulario ---
const form = document.getElementById('loginForm');

// Se ejecuta cuando el usuario intenta enviar el formulario
form.addEventListener('submit', event => {
  // Si el formulario no cumple las reglas de validación HTML5
  if (!form.checkValidity()) {
    event.preventDefault(); // evita que se envíe
    event.stopPropagation(); // detiene la propagación del evento
  }
  // Añade clases de Bootstrap para mostrar los mensajes de error
  form.classList.add('was-validated');
});

// --- Mostrar u ocultar contraseña ---
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const iconEye = document.getElementById('iconEye');

// Si el botón de mostrar/ocultar existe
if (togglePassword) {
  togglePassword.addEventListener('click', () => {
    // Alterna entre tipo "password" y "text"
    const tipo = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', tipo);

    // Cambia el icono del ojito (en este caso usamos la misma imagen)
    if (tipo === 'text') {
      iconEye.src = '../assets/img/ojitologin.svg'; 
    } else {
      iconEye.src = '../assets/img/ojitologin.svg'; 
    }
  });
}

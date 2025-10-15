
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });
 // --- Mostrar u ocultar contraseña ---
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const iconEye = document.getElementById('iconEye');

if (togglePassword) {
  togglePassword.addEventListener('click', () => {
    const tipo = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', tipo);

  
    if (tipo === 'text') {
      iconEye.src = '../assets/img/ojitologin.svg'; 
    } else {
      iconEye.src = '../assets/img/ojitologin.svg'; 
    }
  });
}

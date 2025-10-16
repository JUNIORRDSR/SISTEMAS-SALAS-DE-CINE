  // Mostrar / ocultar contraseña
    function togglePassword(id, element) {
      const input = document.getElementById(id);
      const icon = element.querySelector('i');

      if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("bi-eye", "bi-eye-slash");
      } else {
        input.type = "password";
        icon.classList.replace("bi-eye-slash", "bi-eye");
      }
    }

    // Validar contraseñas
    document.getElementById('registroForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const pass = document.getElementById('password').value;
      const confirm = document.getElementById('confirmarPassword').value;

      if (pass !== confirm) {
        alert('Las contraseñas no coinciden');
      } else {
        alert('Registro exitoso ✅');
        // Aquí puedes redirigir o guardar datos
      }
    });
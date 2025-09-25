# Prueba de Conexión a la Base de Datos

Este directorio contiene un script de ejemplo (`conexiondb.js`) para probar la conexión a la base de datos MySQL utilizada en el proyecto.

## Pasos para ejecutar la prueba de conexión

1. **Ubícate en la carpeta raíz del proyecto**

   Abre una terminal y navega a la raíz del proyecto:
   ```bash
   cd /ruta/a/SISTEMAS-SALAS-DE-CINE
   ```

2. **Instala las dependencias necesarias**

   Ejecuta el siguiente comando para instalar los paquetes requeridos:
   ```bash
   npm install mysql2 dotenv
   ```

3. **Crea el archivo `.env` en la raíz del proyecto**

   En la carpeta raíz (`SISTEMAS-SALAS-DE-CINE`), crea un archivo llamado `.env` con el siguiente contenido (ajusta los valores según tu configuración de base de datos):
   ```env
   HOST_NAME=localhost
   MYSQL_DATABASE=nombre_de_tu_base
   MYSQL_USER=usuario
   MYSQL_ROOT_PASSWORD=contraseña
   ```

4. **Ejecuta el script de conexión**

   Desde la raíz del proyecto, ejecuta el archivo de prueba:
   ```bash
   node database/test conexion/conexiondb.js
   ```

   Si la conexión es exitosa, verás el mensaje `CONEXION EXITOSA` y el resultado de una consulta de prueba.

---

**Nota:**
- Asegúrate de que tu base de datos esté en funcionamiento y que la tabla `Clientes` exista para que la consulta de prueba funcione correctamente.
- No subas tu archivo `.env` a repositorios públicos.

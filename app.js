const express = require('express');
const app = express();
const cajerosRoutes = require('./backend/src/routes/cajeros_routes');
const clientesRoutes = require('./backend/src/routes/clientes_routes');
app.use(express.json());

app.use('/clientes', clientesRoutes);
app.use('/cajeros', cajerosRoutes);

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
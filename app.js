const express = require('express');
const app = express();
const cajerosRoutes = require('./backend/src/routes/cajeros_routes');
const clientesRoute = require('./backend/src/routes/clientes_route');
app.use(express.json());

app.use('/clientes', clientesRoute);
app.use('/cajeros', cajerosRoutes);

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
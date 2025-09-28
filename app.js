const express = require('express');
const app = express();
const clientesRoute = require('./backend/src/routes/clientes_route');
app.use(express.json());


app.use('/clientes', clientesRoute);


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
const express = require('express');
const app = express();
const cajerosRoutes = require('./backend/src/routes/cajeros_routes');
const clientesRoute = require('./backend/src/routes/clientes_route');
app.use(express.json());

app.use('/clientes', clientesRoute);
app.use('/cajeros', cajerosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: '🎬 Sistema de Salas de Cine - API funcionando',
        version: '1.0.0',
        endpoints: {
            cajeros: '/cajeros',
            clientes: '/clientes'
        }
    });
});


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
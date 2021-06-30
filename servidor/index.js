const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors')
// Crear servidor
const app = express();

// Conectar a la BBDD

conectarDB();
app.use(cors())
app.use(express.json()); // habilitamos la opcion que nos envien JSON al back

app.use('/api/productos', require('./routes/producto'))


app.listen(4000, () =>{
    console.log('El servidor se esta ejecutando');
})

//Cargar modulos relacionados con las dependencias de la aplicacion
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Configuracion de base de datos MongoDB 
const config = require('./configuracionBD.js');
const mongoose = require('mongoose');
require('./Carro.rutas.js')(app);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Satisfactoria conexión a base de datos");    
}).catch(err => {
    console.log('No se puede conectar a la base de datos. Exiting now...', err);
    process.exit();
});

// default route
app.get('/', (req, res) => {
    res.json({"message": "Bienvenidos a Uniempresarial Service REST with Mongo DB"});
});

// listen on port 3000
app.listen(config.serverport, () => {
    console.log("Servidor escuchando por el puerto  3000");
});
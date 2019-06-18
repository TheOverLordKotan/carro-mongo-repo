module.exports = (app) => {
    const Carro = require('./Carro.controlador.js');

    // Ruta invocada para crear un nuevo Carro en la base de datos
    app.post('/carro', Carro.create);

    // Ruta utilizada para recuperar todos los carros
    app.get('/carros', Carro.findAll);

    // Ruta utilizada para recuperar un registro especifico basado en el id del Carro
    app.get('/carros/:idCarro', Carro.findOne);

    // Ruta utilizada para actualizar un registro basado en el id del Carro
    app.put('/carros/:idCarro', Carro.update);

    // Delete a Note with productId
    app.delete('/carros/:idCarro', Carro.delete);
}
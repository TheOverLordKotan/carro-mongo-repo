const mongoose = require('mongoose');

const EsquemaCarro = mongoose.Schema({
    titulo: String,
    descripcion: String,
    valor: Number,
    empresa: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Carro', EsquemaCarro);
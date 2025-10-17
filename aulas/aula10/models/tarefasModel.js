const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome: String,
    concluida: Boolean
});

module.exports = mongoose.model('Tarefa', schema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EstudaSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    turma: { type: String, required: true },
    created: { type: Date, default: null },
    updated: { type: Date, default: null }
});

module.exports = mongoose.model('Estuda', EstudaSchema, 'estuda')
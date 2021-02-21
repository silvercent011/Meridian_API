const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfessorSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    email: {type: String, default: null},
    created: { type: Date, default: null },
    updated: { type: Date, default: null },
});

module.exports = mongoose.model('Professor', ProfessorSchema, 'professores')
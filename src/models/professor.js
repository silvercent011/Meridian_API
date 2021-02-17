const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfessorSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    dt_nascimento: { type: String, default: null},
    email: {type: String, default: null},
    created: { type: Date, default: null },
    updated: { type: Date, default: null },
    enabled: { type: Boolean, default: true}
});

module.exports = mongoose.model('Professor', ProfessorSchema, 'professores')
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InteresseSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, auto: true},
    nomeAluno: { type: String, required: true },
    nomeResponsavel: { type: String, required: true },
    turma: { type: String, required: true },
    numero: { type: String, required: true },
    email: {type: String, default: null},
    created: { type: Date, default: null },
    updated: { type: Date, default: null },
    enabled: { type: Boolean, default: true}
});

module.exports = mongoose.model('Interesse', InteresseSchema, 'listaInteresse')
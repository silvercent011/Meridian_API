const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TurmaSchema = new Schema({
    _id:{type: String, required: true, unique: true},
    nome:{type: String, required: true, unique: true},
    nivel:{type: String, required: true},
});

module.exports = mongoose.model('Turma', TurmaSchema, 'turmas')
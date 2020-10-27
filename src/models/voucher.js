const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Voucher = new Schema({
    _id: { type: String, unique: true, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    nome: { type: String, required: true },
    turma: { type: String, default: null },
    created: { type: Date, default: null },
    updated: { type: Date, default: null },
})

module.exports = mongoose.model('Voucher', Voucher, "voucher")
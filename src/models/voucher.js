const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Voucher = new Schema({
    _id: { type: String, unique: true, required: true },
    nome: { type: String, required: true },
    turma: { type: String, default: null },
    email: { type: String, default: null },
    voucher: { type: String, default: null },
    created: { type: Date, default: null },
    updated: { type: Date, default: null },
})

module.exports = mongoose.model('Voucher', Voucher, "voucher")
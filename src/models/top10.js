const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Top10 = new Schema({
    _id: { type: String, unique: true, required: true },
    nome: { type: String, required: true },
    desconto: { type: String, default: null },
    mat: { type: String, default: null },
    port: { type: String, default: null },
    red: { type: Date, default: null },
    media: { type: Date, default: null },
})

module.exports = mongoose.model('Top10', Top10, "top10")
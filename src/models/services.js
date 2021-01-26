const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ServiceSchema = ({
    _id: {type: String, required:true, unique:true},
    matricula: {type: String, required:true, unique:true},
    services: {type: Map, of: String},
    created: { type: Date, default: null },
    updated: { type: Date, default: null },
})

module.exports = mongoose.model('ServiceSchema', ServiceSchema, "services")
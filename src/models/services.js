const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ServiceSchema = ({
    // _id: {type: String, unique:true},
    matricula: {type: String, required:true},
    serviceName: {type: String, required:true},
    data: {type: String, required:true},
    created: { type: Date, default: null },
    updated: { type: Date, default: null },
    enabled: { type: Boolean, default: true}
})

module.exports = mongoose.model('ServiceSchema', ServiceSchema, "services")
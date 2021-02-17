const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicesListSchema = new Schema({
    nome:{type: String, required: true, unique: true},
});

module.exports = mongoose.model('ServicesList', ServicesListSchema, 'services_data')
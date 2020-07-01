const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{type: String, required: true, unique: true},
    content:{type: String, required: true},
    created: {type: Date, default: null},
    updated: {type: Date, default: null},
    expires: {type: Date, default: null},
});

module.exports = mongoose.model('Post', PostSchema, 'posts')
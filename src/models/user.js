const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    nome: { type: String, required: true },
    level: { type: String, required: true, default: '1'},
    created: { type: Date, default: null },
    updated: { type: Date, default: null },
});

UserSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next()
})

module.exports = mongoose.model('User', UserSchema, 'users')
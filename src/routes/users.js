const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('../auth/jsonauth')

//funcaoAuxiliar
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

const Users = require('../models/user');

router.get('/:id', token, async (req, res) => {
    info = req.params
    await Users.findOne({ _id: info.id }, (err, data) => {
        if (err) return res.send({ error: "ERRO NA CONSULTA DE USUÁRIOS" })
        res.send(data);
    });
});

router.get('/', token, async (req, res) => {
    await Users.find({}, (err, data) => {
        if (err) return res.send({ error: "ERRO NA CONSULTA DE USUÁRIOS" })
        res.send(data);
    });
});

router.post('/create', async (req, res) => {
    const { email, password, nome } = req.body;
    const created = Date.now()
    const { cpf } = req.body
    const _id = cpf
    const data = { _id, cpf, email, password, nome, created }
    await Users.create(data, (err, dados) => {
        if (err) return res.send({ error: err });

        dados.password = undefined;
        return res.send({ dados, token: createUserToken(dados._id) });
    });
});

router.post('/auth', async (req, res) => {
    const { cpf, password } = req.body;
    if (!cpf || !password) return res.send({ error: "Dados insuficientes" })

    await Users.findOne({ _id: cpf }, (err, data) => {
        if (err) return res.send({ error: "Erro ao buscar usuário!" });

        bcrypt.compare(password, data.password, (err, same) => {
            if (!same) return res.send({ error: "Senha incorreta" })

            data.password = undefined;
            return res.send({ data, token: createUserToken(data._id) });
        })
    }).select('+password');
});

module.exports = router;
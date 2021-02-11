const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('../auth/jsonauth')
const keyCheck = require('../auth/auth')

//funcaoAuxiliar
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

const Users = require('../models/user');

router.get('/:id', token, async (req, res) => {
    info = req.params

    try {
        if (!await Users.findOne({ _id: info.id })) return res.send({ error: "Usuário não encontrado" });
        const aluno = await Users.findOne({ _id: info.id });
        return res.send(aluno)
    } catch (err) {
        return res.status(400).send({ error: "ERRO NA CONSULTA DE USUÁRIOS" })
    }

});

router.get('/', token, async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users)
    } catch (err) {
        return res.status(400).send({ error: "ERRO NA CONSULTA DE USUÁRIOS" })
    }

});

router.post('/create', keyCheck, async (req, res) => {
    const { email, password, nome, level, cpf } = req.body;

    if (!email || !password || !nome || !level || !cpf) return res.send({ error: "Dados insuficientes" })

    const created = Date.now()
    const _id = cpf
    const data = { _id, cpf, email, password, nome, created, level }

    try {
        const sendUser = await Users.create(data)
        sendUser.password = undefined
        return res.status(201).send({ sendUser, token: createUserToken(sendUser._id) });
    } catch (err) {
        return res.status(400).send({ error: "ERRO AO CADASTRAR USUÁRIO" });
    }
});

router.post('/auth', async (req, res) => {
    const { cpf, password } = req.body;
    if (!cpf || !password) return res.send({ error: "Dados insuficientes" })

    try {
        const userData = await Users.findOne({ _id: cpf }).select('+password')
        if (!userData) {
            return res.send({ error: "Usuário não encontrado" })
        }

        const passwordCheck = await bcrypt.compare(password, userData.password)
        if (!passwordCheck) {
            return res.send({ error: "Senha incorreta" })
        }

        userData.password = undefined
        return res.send({ userData, passed: true, token: createUserToken(userData._id) });
    } catch (err) {
        return res.status(400).send({ error: "Erro ao autenticar usuário!" });
    }
});

module.exports = router;
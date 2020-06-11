const express = require('express');
const router = express.Router();

const MatificUser = require('../models/matific_user');
const Aluno = require('../models/aluno');

router.post('/', async (req, res) => {
    let aluno = await req.body;
    let { matricula, senha, login } = aluno
    if (!matricula || !senha || !login) return res.send({ error: "Dados insuficientes" })

    try {
        const alunoData = await Aluno.findOne({ _id: matricula })
        matricula = alunoData.matricula
        turma = alunoData.turma
    } catch (err) {
        return res.send({ error: "Aluno não encontrado" })
    }

    let data = {
        _id: matricula,
        password: senha,
        created: Date.now(),
        turma: turma,
        login: login
    }

    try {
        const MatificSend = await MatificUser.create(data)
        return res.send(MatificSend)
    } catch (err) {
        return res.send({ error: "Erro ao enviar dados" })
    }

})


module.exports = router;
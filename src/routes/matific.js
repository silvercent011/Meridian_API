const express = require('express');
const router = express.Router();

const MatificUser = require('../models/matific_user');
const Aluno = require('../models/aluno');

router.post('/', async (req, res) => {
    let aluno = req.body;
    let { matricula, senha, turma, login } = req.body
    if (!matricula || !senha || !turma || !login) return res.send({ error: "Dados insuficientes" })
    Aluno.findOne({ _id: matricula }, function (err, docs) {
        if (err) return res.send({ error: "Aluno não encontrado" })
        info = docs
    })



    let data = {
        _id: matricula,
        password: senha,
        created: Date.now(),
        turma: turma,
        login: login
    }
    await MatificUser.create(data, (err, data) => {
        if (err) return res.send({ error: "Erro ao enviar dados" })

        return res.send(data)
    })

})


module.exports = router;
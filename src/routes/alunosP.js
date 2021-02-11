const express = require('express');
const router = express.Router();

const Alunos = require('../models/aluno');

router.get('/:id', async (req, res) => {
    const info = req.params;
    const { dt_nascimento } = req.headers

    if (!await Alunos.findOne({ _id: info.id })) return res.status(400).send({ error: 'Aluno não encontrado nos registros.' })
    const query = await Alunos.findOne({ _id: info.id });

    if (dt_nascimento == query.dt_nascimento) {
        return res.send(query);
    } else {
        return res.status(400).send({ error: "Dados não conferem" })
    }

});


router.get('/basic/:id', async (req, res) => {
    const info = req.params;

    try {
        if (!await Alunos.findOne({ _id: info.id })) return res.status(400).send({ error: 'Aluno não encontrado nos registros.' })
        const query = await Alunos.findOne({ _id: info.id });
        return res.send(query)
    } catch (error) {
        return res.status(400).send({ error: "Aluno não encontrado" })
    }

});

module.exports = router;
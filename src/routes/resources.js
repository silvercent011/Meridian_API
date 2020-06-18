const express = require('express');
const router = express.Router();

const Turmas = require('../models/turma');

router.get('/turmas', async (req, res) => {
    try {
        if (!await Turmas.find({})) return res.send({ error: 'Sem turmas cadastradas' })
        const GetTurmas = await Turmas.find({});
        return res.send(GetTurmas)
    } catch (err) {
        return res.send({ error: 'Erro ao consultar turmas' })
    }
});

router.get('/turmas/:id', async (req, res) => {
    const info = req.params;
    try {
        if (!await Turmas.findOne({ _id: info.id })) return res.send({ error: 'Turma não encontrada' })
        const GetTurmas = await Turmas.findOne({ _id: info.id })
        return res.send(GetTurmas)
    } catch (error) {
        return res.send({ error: 'Erro ao consultar turmas' })
    }
});
router.post('/turmas', async (req, res) => {
    const { nome, nivel } = req.body;
    const _id = Math.floor(Date.now() / 1000)
    const data = { _id, nome, nivel }

    try {
        if (await Turmas.findOne({ nome: nome })) return res.send({ error: 'Turma já existe' })
        const CadTurma = await Turmas.create(data);
        return res.send(CadTurma)
    } catch (error) {
        return res.send({ error: 'Erro ao cadastrar turma' })
    }
})

module.exports = router;
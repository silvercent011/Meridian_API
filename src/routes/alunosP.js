const express = require('express');
const router = express.Router();

const Alunos = require('../models/aluno');
const MatificUser = require('../models/matific_user');
const InspiraUser = require('../models/inspira_user');
const EstudaUser = require('../models/estudaDotCom');
const VoucherUser = require('../models/voucher');

router.get('/:id', async (req, res) => {
    const info = req.params;
    const { dt_nascimento } = req.body

    if (!await Alunos.findOne({ _id: info.id })) return res.send({ error: 'Aluno não encontrado nos registros.' })
    const query = await Alunos.findOne({ _id: info.id });

    if (dt_nascimento == query.dt_nascimento) {
        return res.send(query);
    } else {
        return res.send({ error: "Dados não conferem" })
    }

});

router.get('/matific/:id', async (req, res) => {
    const info = req.params;

    try {
        if (!await MatificUser.findOne({ _id: info.id })) return res.send({ error: 'Aluno não encontrado nos registros.' })
        const matific = await MatificUser.findOne({ _id: info.id });
        return res.send(matific)

    } catch (error) {
        return res.send({ error: "Aluno não encontrado" })
    }

});


router.get('/estuda/:id', async (req, res) => {
    const info = req.params;

    try {
        if (!await EstudaUser.findOne({ _id: info.id })) return res.send({ error: 'Aluno não encontrado nos registros.' })
        const Estuda = await EstudaUser.findOne({ _id: info.id });
        return res.send(Estuda)

    } catch (error) {
        return res.send({ error: "Aluno não encontrado" })
    }

});
router.get('/inspira/:id', async (req, res) => {
    const info = req.params;

    try {
        if (!await InspiraUser.findOne({ _id: info.id })) return res.send({ error: 'Aluno não encontrado nos registros.' })
        const inspira = await InspiraUser.findOne({ _id: info.id });
        return res.send(inspira)

    } catch (error) {
        return res.send({ error: "Aluno não encontrado" })
    }

});

router.get('/voucher/:id', async (req, res) => {
    const info = req.params;

    try {
        if (!await VoucherUser.findOne({ _id: info.id })) return res.send({ error: 'Aluno não encontrado nos registros.' })
        const inspira = await VoucherUser.findOne({ _id: info.id });
        return res.send(inspira)

    } catch (error) {
        return res.send({ error: "Aluno não encontrado" })
    }

});

module.exports = router;
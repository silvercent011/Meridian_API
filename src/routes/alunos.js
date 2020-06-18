const express = require('express');
const router = express.Router();

const Alunos = require('../models/aluno');

router.get('/:id', async (req, res) => {
    const info = req.params;
    try {
        if (!await Alunos.findOne({ _id: info.id })) return res.send({ error: 'Aluno não encontrado nos registros.' })
        const query = await Alunos.findOne({ _id: info.id });
        return res.send(query);
    } catch (error) {
        return res.send({ error: 'Erro na consulta de alunos!' })
    }
});

router.get('/', async (req, res) => {
    try {
        if (!await Alunos.find({})) return res.send({ error: 'Erro na consulta de alunos!' })
        const data = await Alunos.find({})
        return res.send(data)
    } catch (err) {
        return res.send({ error: 'Erro na consulta de alunos!' })
    }
});

router.post('/', async (req, res) => {
    const { _id, matricula } = req.body
    const { nome, turma, nivel, dt_nascimento, turno } = req.body
    const created = Date.now()

    const data = {
        _id, matricula, nome, turma, nivel, dt_nascimento, turno, created
    }

    try {
        if (await Alunos.findOne({_id:_id})) return res.send({error:'Matricula já cadastrada'})
        const aluno = await Alunos.create(data)
        return res.send(aluno)
    } catch (error) {
        return res.send({ error: 'Erro ao cadastrar aluno!' })
    }

    console.log(`Aluno ${nome} criado no BD em ${created}`);
});


module.exports = router;
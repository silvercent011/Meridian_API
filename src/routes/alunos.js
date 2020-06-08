const express = require('express');
const router = express.Router();

const Alunos = require('../models/aluno');

router.get('/:id', async (req,res) => {
    const info = req.params;
    const query = await Alunos.findOne({_id: info.id});
    return res.send(query);
});

router.get('/', async (req, res) => {
    await Alunos.find({}, (err, data) => {
        if (err) {
            return res.send({ error: 'ERRO NA CONSULTA DE ALUNOS!' })
        }
        return res.send(data);
    })
});

router.post('/', (req, res) => {
    const { _id, matricula } = req.body
    const { nome, turma, nivel, dt_nascimento, turno } = req.body
    const created = Date.now()

    const data = {
        _id, matricula, nome, turma, nivel, dt_nascimento, turno, created
    }

    Alunos.create(data, (err, dados) => {
        if (error) return res.send({error: err});
        return res.send(dados)
    });
    console.log(`Aluno ${nome} criado no BD em ${created}`);
});


module.exports = router;
const express = require('express');
const router = express.Router();

const Turmas = require('../models/turma');
const ServicesList = require('../models/servicesList');

router.get('/turmas', async (req, res) => {
    try {
        if (!await Turmas.find({})) return res.status(400).send({ error: 'Sem turmas cadastradas' })
        const GetTurmas = await Turmas.find({});
        return res.send(GetTurmas)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao consultar turmas' })
    }
});

router.get('/turmas/:id', async (req, res) => {
    const info = req.params;
    try {
        if (!await Turmas.findOne({ _id: info.id })) return res.status(400).send({ error: 'Turma não encontrada' })
        const GetTurmas = await Turmas.findOne({ _id: info.id })
        return res.send(GetTurmas)
    } catch (error) {
        return res.status(400).send({ error: 'Erro ao consultar turmas' })
    }
});
router.post('/turmas', async (req, res) => {
    const { nome, nivel } = req.body;
    const _id = Math.floor(Date.now() / 1000)
    const data = { _id, nome, nivel }

    try {
        if (await Turmas.findOne({ nome: nome })) return res.status(400).send({ error: 'Turma já existe' })
        const CadTurma = await Turmas.create(data);
        return res.status(201).send(CadTurma)
    } catch (error) {
        return res.status(400).send({ error: 'Erro ao cadastrar turma' })
    }
})

router.get('/services', async (req, res) => {
    try {
        if (!await ServicesList.find({})) return res.status(400).send({ error: 'Sem serviços cadastradas' })
        const GetServices = await ServicesList.find({});
        return res.send(GetServices)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao consultar serviços' })
    }
});

router.post('/services', async (req, res) => {
    const { nome } = req.body;
    const data = { nome }

    try {
        if (await ServicesList.findOne({ nome: nome })) return res.status(400).send({ error: 'Serviço já existe' })
        const CadService = await ServicesList.create(data);
        return res.status(201).send(CadService)
    } catch (error) {
        return res.status(400).send({ error: 'Erro ao cadastrar serviço' })
    }
})

router.delete('/services/:id', async(req,res) => {
    const _id = req.params.id
    const filter = {_id:_id}

    try {
        if (! await ServicesList.findOne({_id:_id})) return res.status(400).send({error: 'Serviço não encontrado nos registros'})

        const dataUpdated = await ServicesList.findByIdAndDelete(filter);
        return res.send(dataUpdated)
        
    } catch (error) {
        return res.status(400).send({error: 'Não foi possível desativar os serviço.'})
    }

});

module.exports = router;
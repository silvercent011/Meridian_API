const express = require('express');
const router = express.Router();
const keyCheck = require('../auth/auth')
const jsonauth = require('../auth/jsonauth')
const Services = require('../models/services')

router.get('/', keyCheck, async (req, res) => {
    try {
        if (! await Services.find({})) return res.status(400).send({ error: 'Falha na consulta' })
        const data = Services.find({})
        res.send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:matricula', async (req, res) => {
    const info = req.params
    try {
        if (!await Services.find({ matricula: info.matricula })) return res.status(400).send({ error: 'Serviços não encontrados para o aluno.' })
        const query = await Services.find({ matricula: info.matricula });
        res.send(query)
    } catch (error) {
        res.status(400).send(error)
    }

});

router.post('/', jsonauth, async (req, res) => {
    const { matricula, serviceName } = req.body
    const data = req.body
    const created = Date.now()
    data['created'] = created
    const { nome } = data

    try {
        // if (await Services.findOne({_id:_id})) return res.status(400).send({error:'Serviços já localizados, utilize o PATCH para adicionar mais'})
        // if (await Services.findOne({ matricula: matricula, serviceName: serviceName })) return res.status(400).send({ error: 'Serviço já cadastrado para o aluno' })
        const consulta = await Services.findOne({ matricula: matricula, serviceName: serviceName })
        if (consulta) {
            return res.status(400).send({ error: 'Serviço já cadastrado para o aluno' })
        } else {
            const query = await Services.create(data)
            return res.status(201).send(query)
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Erro ao cadastrar' })
    }
});

router.patch('/:id', jsonauth, async (req, res) => {
    const _id = req.params.id
    const query = req.body
    const filter = { _id: _id }
    const updated = Date.now()

    try {
        if (! await Services.findOne({ _id: _id })) return res.status(400).send({ error: 'Serviço não encontrado nos registros' })
        const Service = await Services.findOne({ _id: _id });
        const data = { updated }
        for (const key in query) {
            if (Service[key] != query[key]) {
                data[key] = query[key];
            }
        }
        const dataUpdated = await Services.findOneAndUpdate(filter, data, { returnOriginal: false });
        return res.send(await Services.findOne({ _id: _id }))

    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Não foi possível atualizar os dados do serviço no momento.' })
    }

});

router.delete('/:id', jsonauth, async (req, res) => {
    const _id = req.params.id
    const filter = { _id: _id }
    const updated = Date.now()

    try {
        if (! await Services.findOne({ _id: _id })) return res.status(400).send({ error: 'Serviço não encontrado nos registros' })
        const data = { updated, enabled: false }

        const dataUpdated = await Services.findOneAndUpdate(filter, data, { returnOriginal: false });
        return res.send(await Services.findOne({ _id: _id }))

    } catch (error) {
        return res.status(400).send({ error: 'Não foi possível desativar os serviço.' })
    }

});

module.exports = router; 
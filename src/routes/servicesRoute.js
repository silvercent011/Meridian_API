const express = require('express');
const router = express.Router();
const keyCheck = require('../auth/auth')
const Services = require('../models/services')

router.get('/', keyCheck ,async(req, res) => {
    try {
        if(! await Services.find({})) return res.send({error:'Falha na consulta'})
        const data = Services.find({})
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

router.get('/:matricula', keyCheck ,async (req, res) => {
    const info = req.params

    if (!await Services.find({ matricula: info.matricula })) return res.send({ error: 'Serviços não encontrados para o aluno.' })
    const query = await Services.find({ matricula: info.matricula });
    res.send(query)

});

router.post('/', keyCheck ,async (req, res) => {
    // const { matricula } = req.body
    const data = req.body
    const created = Date.now()
    data['created'] = created
    const {nome} = data

    try {
        // if (await Services.findOne({_id:_id})) return res.send({error:'Serviços já localizados, utilize o PATCH para adicionar mais'})
        const query = await Services.create(data)
        return res.send(query)
    } catch (error) {
        return res.send({ error: 'Erro ao cadastrar' })
    }
});

router.patch('/:id', keyCheck ,async(req,res) => {
    const _id = req.params.id
    const query = req.body
    const filter = {_id:_id}
    const updated = Date.now()

    try {
        if (! await Services.findOne({_id:_id})) return res.send({error: 'Serviço não encontrado nos registros'})
        const Service = await Services.findOne({_id:_id});
        const data = { updated, query }
        const dataUpdated = await Services.findOneAndUpdate(filter,data,{returnOriginal: false});
        return res.send(await Services.findOne({_id:_id}))
        
    } catch (error) {
        return res.send({error: 'Não foi possível atualizar os dados do aluno no momento.'})
    }

});

router.delete('/:id', keyCheck , async(req,res) => {
    const _id = req.params.id
    const filter = {_id:_id}
    const updated = Date.now()

    try {
        if (! await Services.findOne({_id:_id})) return res.send({error: 'Serviço não encontrado nos registros'})
        const data = { updated, enabled: false }

        const dataUpdated = await Services.findOneAndUpdate(filter,data,{returnOriginal: false});
        return res.send(await Services.findOne({_id:_id}))
        
    } catch (error) {
        return res.send({error: 'Não foi possível desativar os serviço.'})
    }

});

module.exports = router; 
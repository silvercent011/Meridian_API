const express = require('express');
const router = express.Router();

const Professores = require('../models/professor');
const { update } = require('../models/professor');

router.get('/', async (req, res) => {
    try {
        if (!await Professores.find({})) return res.status(400).send({ error: 'Erro na consulta de professores!' })
        const data = await Professores.find({})
        return res.send(data)
    } catch (err) {
        return res.status(400).send({ error: 'Erro na consulta de professores!' })
    }
});

router.get('/:id', async (req, res) => {
    const info = req.params;
    try {
        if (!await Professores.findOne({ _id: info.id })) return res.status(400).send({ error: 'Professor não encontrado nos registros.' })
        const query = await Professores.findOne({ _id: info.id });
        return res.send(query);
    } catch (error) {
        return res.status(400).send({ error: 'Erro na consulta de professores!' })
    }
});


router.post('/', async (req, res) => {
    const { _id, cpf } = req.body
    const data = req.body
    const created = Date.now()
    data['created'] = created
    data['_id'] = cpf

    const {nome} = data

    try {
        if (await Professores.findOne({_id:_id})) return res.status(400).send({error:'CPF já cadastrado'})
        const professor = await Professores.create(data)
        return res.status(201).send(professor)
    } catch (error) {
        return res.status(400).send({ error: 'Erro ao cadastrar professor!' })
    }
});

router.patch('/:id', async(req,res) => {
    const _id = req.params.id
    const query = req.body
    const filter = {_id:_id}
    const updated = Date.now()

    try {
        if (! await Professores.findOne({_id:_id})) return res.status(400).send({error: 'Professor não encontrado nos registros'})
        const Professor = await Professores.findOne({_id:_id});
        const data = { updated }
        for (const key in query) {
            if (Professor[key] != query[key] ) {
                data[key] = query[key];
            }
        }

        const dataUpdated = await Professores.findOneAndUpdate(filter,data,{returnOriginal: false});
        return res.send(await Professores.findOne({_id:_id}))
        
    } catch (error) {
        return res.status(400).send({error: 'Não foi possível atualizar os dados do professor no momento.'})
    }

});

router.delete('/:id', async(req,res) => {
    const _id = req.params.id
    const filter = {_id:_id}
    const updated = Date.now()

    try {
        if (! await Professores.findOne({_id:_id})) return res.status(400).send({error: 'Professor não encontrado nos registros'})
        const data = { updated, enabled: false }

        const dataUpdated = await Professores.findOneAndDelete(filter);
        return res.send(await Professores.findOne({_id:_id}))
        
    } catch (error) {
        return res.status(400).send({error: 'Não foi possível desativar o professor.'})
    }

});


module.exports = router;

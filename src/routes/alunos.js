const express = require('express');
const router = express.Router();

const Alunos = require('../models/aluno');
const { update } = require('../models/aluno');

router.get('/', async (req, res) => {
    try {
        if (!await Alunos.find({})) return res.status(400).send({ error: 'Erro na consulta de alunos!' })
        const data = await Alunos.find({})
        return res.send(data)
    } catch (err) {
        return res.status(400).send({ error: 'Erro na consulta de alunos!' })
    }
});

router.get('/:id', async (req, res) => {
    const info = req.params;
    try {
        if (!await Alunos.findOne({ _id: info.id })) return res.status(400).send({ error: 'Aluno não encontrado nos registros.' })
        const query = await Alunos.findOne({ _id: info.id });
        return res.send(query);
    } catch (error) {
        return res.status(400).send({ error: 'Erro na consulta de alunos!' })
    }
});


router.post('/', async (req, res) => {
    const { _id, matricula } = req.body
    const data = req.body
    const created = Date.now()
    data['created'] = created
    data['_id'] = matricula

    const {nome} = data

    try {
        if (await Alunos.findOne({_id:_id})) return res.status(400).send({error:'Matricula já cadastrada'})
        const aluno = await Alunos.create(data)
        return res.status(201).send(aluno)
    } catch (error) {
        return res.status(400).send({ error: 'Erro ao cadastrar aluno!' })
    }
});

router.patch('/:id', async(req,res) => {
    const _id = req.params.id
    const query = req.body
    const filter = {_id:_id}
    const updated = Date.now()

    try {
        if (! await Alunos.findOne({_id:_id})) return res.status(400).send({error: 'Aluno não encontrado nos registros'})
        const Aluno = await Alunos.findOne({_id:_id});
        const data = { updated }
        for (const key in query) {
            if (Aluno[key] != query[key] ) {
                data[key] = query[key];
            }
        }

        const dataUpdated = await Alunos.findOneAndUpdate(filter,data,{returnOriginal: false});
        return res.send(await Alunos.findOne({_id:_id}))
        
    } catch (error) {
        return res.status(400).send({error: 'Não foi possível atualizar os dados do aluno no momento.'})
    }

});

router.delete('/:id', async(req,res) => {
    const _id = req.params.id
    const filter = {_id:_id}
    const updated = Date.now()

    try {
        if (! await Alunos.findOne({_id:_id})) return res.status(400).send({error: 'Aluno não encontrado nos registros'})
        const data = { enabled: false }

        const dataUpdated = await Alunos.findOneAndUpdate(filter,data,{returnOriginal: false});
        return res.send(await Alunos.findOne({_id:_id}))
        
    } catch (error) {
        return res.status(400).send({error: 'Não foi possível desativar o aluno.'})
    }

});


module.exports = router;

/*

200 - OK
201 - Created
202 - Accepted
400 - Bad request
401 - Unauthorized
403 - Forbiden
*/
const express = require('express');
const router = express.Router();

const Inspira = require('../models/inspira_user');
const Aluno = require('../models/aluno');

router.get('/', async (req, res) => {
    try {
        if (!await Inspira.find({})) return res.send({ error: 'Nenhum cadastro da plataforma encontrado' })
        const inspiraUsers = await Inspira.find({})
        return res.send(inspiraUsers)
    } catch (error) {
        return res.send({ error: 'Erro ao consultar dados' })
    }
})

router.get('/:id', async (req, res) => {
    const info = req.params;
    try {
        if (!await Inspira.findOne({ _id: info.id })) return res.send({ error: 'Aluno não encontrado' })
        const inspiraUsers = await Inspira.findOne({ _id: info.id })
        return res.send(inspiraUsers)
    } catch (error) {
        return res.send({ error: 'Erro ao consultar dados' })
    }
})

router.post('/', async (req, res) => {
    let aluno = await req.body;
    let { matricula, senha, email, nome } = aluno
    if (!matricula || !senha || !email || !nome) return res.send({ error: "Dados insuficientes" })

    try {
        const alunoData = await Aluno.findOne({ _id: matricula })
        matricula = alunoData.matricula
        turma = alunoData.turma
    } catch (err) {
        return res.send({ error: "Aluno não encontrado" })
    }

    let data = {
        _id: matricula,
        senha: senha,
        created: Date.now(),
        turma: turma,
        email: email,
        nome: nome.toUpperCase()
    }

    try {
        const InspiraSend = await Inspira.create(data)
        return res.send(InspiraSend)
    } catch (err) {
        return res.send({ error: "Erro ao enviar dados" })
    }

})

router.patch('/:id', async(req,res) => {
    const _id = req.params.id
    const query = await req.body
    const filter = {_id:_id}
    const updated = Date.now()

    try {
        if (! await Inspira.findOne({_id:_id})) return res.send({error: 'Cadastro não encontrado nos registros'})
        const InspiraGet = await Inspira.findOne({_id:_id});
        const data = { updated }
        for (const key in query) {
            if (InspiraGet[key] != query[key] ) {
                data[key] = query[key];
            }
        }

        const dataUpdated = await Inspira.findOneAndUpdate(filter,data,{returnOriginal: false});
        return res.send(await Inspira.findOne({_id:_id}))
        
    } catch (error) {
        return res.send({error: 'Não foi possível atualizar os dados do cadastro no momento.'})
    }

});

module.exports = router;
const express = require('express');
const router = express.Router();

const MatificUser = require('../models/matific_user');
const Aluno = require('../models/aluno');

router.get('/', async (req, res) => {
    try {
        if (!await MatificUser.find({})) return res.send({ error: 'Nenhum cadastro do matific encontrado' })
        const matificUsers = await MatificUser.find({})
        return res.send(matificUsers)
    } catch (error) {
        return res.send({ error: 'Erro ao consultar dados' })
    }
})

router.get('/:id', async (req, res) => {
    const info = req.params;
    try {
        if (!await MatificUser.findOne({ _id: info.id })) return res.send({ error: 'Aluno não encontrado' })
        const matificUsers = await MatificUser.findOne({ _id: info.id })
        return res.send(matificUsers)
    } catch (error) {
        return res.send({ error: 'Erro ao consultar dados' })
    }
})

router.post('/create', async (req, res) => {
    let aluno = await req.body;
    let { matricula, senha, login, nome } = aluno
    if (!matricula || !senha || !login || !nome) return res.send({ error: "Dados insuficientes" })

    try {
        const alunoData = await Aluno.findOne({ _id: matricula })
        matricula = alunoData.matricula
        turma = alunoData.turma
    } catch (err) {
        return res.send({ error: "Aluno não encontrado" })
    }

    let data = {
        _id: matricula,
        password: senha,
        created: Date.now(),
        turma: turma,
        login: login,
        nome: nome
    }

    try {
        const MatificSend = await MatificUser.create(data)
        return res.send(MatificSend)
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
        if (! await MatificUser.findOne({_id:_id})) return res.send({error: 'Cadastro não encontrado nos registros'})
        const MatificGet = await MatificUser.findOne({_id:_id});
        const data = { updated }
        for (const key in query) {
            if (MatificGet[key] != query[key] ) {
                data[key] = query[key];
            }
        }

        const dataUpdated = await MatificUser.findOneAndUpdate(filter,data,{returnOriginal: false});
        return res.send(await MatificUser.findOne({_id:_id}))
        
    } catch (error) {
        return res.send({error: 'Não foi possível atualizar os dados do cadastro no momento.'})
    }

});


module.exports = router;
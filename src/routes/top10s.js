const express = require('express');
const router = express.Router();

const Top10 = require('../models/top10');
const Aluno = require('../models/aluno');

router.get('/', async (req, res) => {
    try {
        if (!await Top10.find({})) return res.send({ error: 'Nenhum cadastro do voucher encontrado' })
        const Top10Info = await Top10.find({})
        return res.send(Top10Info)
    } catch (error) {
        return res.send({ error: 'Erro ao consultar dados' })
    }
})

router.get('/:id', async (req, res) => {
    const info = req.params;
    try {
        if (!await Top10.findOne({ _id: info.id })) return res.send({ error: 'Top10 não encontrado' })
        const Top10Info = await Top10.findOne({ _id: info.id })
        return res.send(Top10Info)
    } catch (error) {
        return res.send({ error: 'Erro ao consultar dados' })
    }
})


router.post('/create', async (req, res) => {
    let aluno = await req.body;
    let { matricula, nome, desconto, mat, port, red, media, posicao } = aluno
    if (!matricula || !nome || !desconto || !mat || !port|| !red || !media || !posicao) return res.send({ error: "Dados insuficientes" })

    let data = {
        _id: matricula,
        created: Date.now(),
        nome: nome,
        desconto: desconto,
        mat: mat,
        port: port,
        red: red,
        posisao: posicao,
        media: media,
    }

    try {
        const TP10Send = await Top10.create(data)
        return res.send(TP10Send)
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
        if (! await Top10.findOne({_id:_id})) return res.send({error: 'Cadastro não encontrado nos registros'})
        const Top10Get = await Top10.findOne({_id:_id});
        const data = { updated }
        for (const key in query) {
            if (Top10Get[key] != query[key] ) {
                data[key] = query[key];
            }
        }

        const dataUpdated = await Top10.findOneAndUpdate(filter,data,{returnOriginal: false});
        return res.send(await Top10.findOne({_id:_id}))
        
    } catch (error) {
        return res.send({error: 'Não foi possível atualizar os dados do cadastro no momento.'})
    }

});


module.exports = router;
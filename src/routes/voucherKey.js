const express = require('express');
const router = express.Router();

const Voucher = require('../models/voucher');

router.get('/', async (req, res) => {
    try {
        if (!await Voucher.find({})) return res.send({ error: 'Nenhum cadastro do voucher encontrado' })
        const Vouchers = await Voucher.find({})
        return res.send(Vouchers)
    } catch (error) {
        return res.send({ error: 'Erro ao consultar dados' })
    }
})

router.get('/:id', async (req, res) => {
    const info = req.params;
    try {
        if (!await Voucher.findOne({ _id: info.id })) return res.send({ error: 'Voucher não encontrado' })
        const Vouchers = await Voucher.findOne({ _id: info.id })
        return res.send(Vouchers)
    } catch (error) {
        return res.send({ error: 'Erro ao consultar dados' })
    }
})


router.patch('/:id', async(req,res) => {
    const _id = req.params.id
    const query = await req.body
    const filter = {_id:_id}
    const updated = Date.now()

    try {
        if (! await Voucher.findOne({_id:_id})) return res.send({error: 'Cadastro não encontrado nos registros'})
        const VoucherGet = await Voucher.findOne({_id:_id});
        const data = { updated }
        for (const key in query) {
            if (MatificGet[key] != query[key] ) {
                data[key] = query[key];
            }
        }

        const dataUpdated = await Voucher.findOneAndUpdate(filter,data,{returnOriginal: false});
        return res.send(await Voucher.findOne({_id:_id}))
        
    } catch (error) {
        return res.send({error: 'Não foi possível atualizar os dados do cadastro no momento.'})
    }

});


module.exports = router;
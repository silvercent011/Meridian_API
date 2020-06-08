const express = require('express');
const router = express.Router();

const Alunos = require('../models/aluno');

router.get('/:id', async (req, res) => {
    const info = req.params;
    const { dt_nascimento } = req.body
    const query = await Alunos.findOne({ _id: info.id });

    if (dt_nascimento == query.dt_nascimento) {
        return res.send(query);
    } else {
        return res.send({error:"Dados não conferem"})
    }

});

module.exports = router;
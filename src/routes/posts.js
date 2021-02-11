const express = require('express');
const router = express.Router();
const token = require('../auth/jsonauth')


const Posts = require('../models/post');


router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find({});
        return res.send(posts)
    } catch (err) {
        return res.status(400).send({ error: "ERRO NA CONSULTA DE POSTS" })
    }
});

router.get('/:id', token, async (req, res) => {
    info = req.params

    try {
        if (!await Posts.findOne({ _id: info.id })) return res.status(400).send({ error: "Post não encontrado" });
        const postGet = await Posts.findOne({ _id: info.id });
        return res.send(postGet)
    } catch (err) {
        return res.status(400).send({ error: "ERRO NA CONSULTA DE POSTS" })
    }

});

router.post('/', token, async (req, res) => {
    const { title, content, expires } = req.body;

    if (!title || !content || !expires) return res.status(400).send({ error: "Dados insuficientes" })

    const created = Date.now()
    const data = { title:title, content:content, expires: new Date(expires), created: created, updated: created }

    try {
        const sendPost = await Posts.create(data)
        return res.status(201).send(sendPost);
    } catch (err) {
        return res.status(400).send({ error: "ERRO AO CRIAR POST" });
    }
});


module.exports = router;
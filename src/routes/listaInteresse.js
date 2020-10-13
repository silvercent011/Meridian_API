const express = require('express');
const router = express.Router();

const telegraf = require('telegraf')
const axios = require('axios')

const Interesse = require('../models/interesse');

//Telegram
const CHAT = process.env.CHAT
const TELEGRAMTOKEN = process.env.TELEGRAMTOKEN
const LISTID = process.env.LISTID
//Trello
const TRELLOKEY = process.env.TRELLOKEY
const TRELLOTOKEN = process.env.TRELLOTOKEN

router.post('/', async (req, res) => {
    const data = req.body
    const created = Date.now()
    data['created'] = created

    const { nome } = data

    try {
        const interessado = await Interesse.create(data)

        //TELEGRAM
        const bot = new telegraf.Telegram(TELEGRAMTOKEN)
        const message = `Olá, temos uma nova pessoa interessada! :) \n ----------------------------------\n 👩 Nome do responsável: ${data.nomeResponsavel} \n 🧒 Nome do aluno(a): ${data.nomeAluno}  \n 📧 E-mail para contato: ${data.email} \n 📞 Telefone para contato: ${data.numero}  \n 🎓 Turma de interesse: ${data.turma} \n ----------------------------------`
        await bot.sendMessage(CHAT, message)

        //TRELLO
        const trello = await axios.post(`https://api.trello.com/1/cards?key=${TRELLOKEY}&token=${TRELLOTOKEN}&idList=${LISTID}`, {
            name: data.nomeAluno,
            desc: `👩 Nome do responsável: ${data.nomeResponsavel} \n 🧒 Nome do aluno(a): ${data.nomeAluno}  \n 📧 E-mail para contato: ${data.email} \n 📞 Telefone para contato: ${data.numero}  \n 🎓 Turma de interesse: ${data.turma}`,
            labels: ["yellow"]
        }).then((response) => {
            return response
        }).catch((response) => {
            return response
        })

        return res.send(interessado)
    } catch (error) {
        return res.send(error)
    }
});

module.exports = router;
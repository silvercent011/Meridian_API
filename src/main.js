const config = require('./config')
const port = process.env.PORT
const express = require('express');
const app = express();
//cors
const cors = require('cors');
app.use(cors());
//BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Options
const options = {
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 500,
    // poolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//MongoDB
const mongoose = require('mongoose');
const url = process.env.MONGO_STRING
mongoose.connect(url, options, () => { console.log('MongoDB Atlas localizado e conectado.') });
mongoose.connection.useDb('meridian_scss')


//Key
const keyCheck = require('./auth/auth')
const token = require('./auth/jsonauth')
//ROTAS
//Index
app.get('/', async (req, res) => {
    await res.json({ status: 'Server is running!' })
})
//Alunos
const alunosRoute = require('./routes/alunos');
const alunospRoute = require('./routes/alunosP');
app.use('/alunosp', keyCheck, alunospRoute);
app.use('/alunos', token, alunosRoute);
// Users
const usersRoute = require('./routes/users')
app.use('/users', usersRoute)
// Posts
const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute)
//Resources
const resourcesRoute = require('./routes/resources')
app.use('/resources', token, resourcesRoute)
//ListaInteresses
const listaInteresseRoute = require('./routes/listaInteresse')
app.use('/listint', listaInteresseRoute)
//Services
const ServicesRoute = require('./routes/servicesRoute')
app.use('/services', ServicesRoute)

app.use(cors());

//SAIDA DE EXECUÇÃO
app.listen(port, () => {
    console.clear();
    console.log('Sidney Alex, 2021, Meridian ScSS WebAPI')
    console.log(`API RODANDO NA PORTA ${port}`);
    console.log('-----------------------------------------')
});
module.exports = app;

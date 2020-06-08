const jwt = require('jsonwebtoken');

module.exports = authjson = async (req,res,next) => {
    const token_header = req.headers.auth

    if (!token_header) return res.send({error: "Autenticação recusada, token não enviado"})

    await jwt.verify(token_header, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.send({error: "Token inválido"})
        res.locals.auth_data = decoded;
        return next()
    })
}
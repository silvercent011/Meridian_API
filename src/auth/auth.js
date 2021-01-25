

const checkKey = (req, res, next) => {
    req.body = JSON.parse(req.body)
    if (req.body.key == process.env.MD5_PUBLIC) {
        next()
    }
    else {
        return res.send({ error: "Key Inválida" })
    }
}

module.exports = checkKey;



const checkKey = (req, res, next) => {
    if (req.body.key == process.env.MD5_PUBLIC) {
        next()
    } else {
        if (req.headers.key == process.env.MD5_PUBLIC) {
            next()
        } else {
            return res.send({ error: "Key Inválida" })
        }
    }
}

module.exports = checkKey;

require('dotenv').config();

module.exports =  params = {
    md5: process.env.MD5_PUBLIC,
    mongo_string: process.env.MONGO_STRING,
    jwt_secret: process.env.JWT_SECRET,
    port: process.env.PORT
}
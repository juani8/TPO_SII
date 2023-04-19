const jwt = require("jsonwebtoken");
// el .config() lee automaticamente el contenido del .env
require('dotenv').config();

const verify_token = async (req, res, next) => {
    // se obtiene el token que trae el request
    const { token } = await req.cookies;

    /* if there is no token */
    if (!token){
        return res.status(401).send({ auth: false, message: 'No token provided' });
    };

    /* callback function, el primer argumento representa un potencial error , 
    el segundo argumento representa el potencial payload del token.
    Aca se debería pasar la clave  */
    await jwt.verify(token, process.env.JWTKEY, (err, validated) => {
        if (err) {
            return res.status(400).send({message:'Invalid token'})
        } else {
            // new atributes on the req
            req._id = validated._id;
            req.email = validated.email;

            // si hay una funcion a continuación, se ejecutara
            if (!!next) next();
        }
    });
}

module.exports = {verify_token};
const jwt = require("jsonwebtoken");
const filesystem = require('fs');
const crypto = require('crypto');

const verify_token = async (req, res, next) => {
    // se obtiene el token que trae el request
    const { token } = await req.cookies;

    /* if there is no token */
    if (!token){
        return res.status(401).send({ auth: false, message: 'No token provided' });
    };

    // para obtener la representacion de la key publica
    const public_key_rep = filesystem.readFileSync('./keys/public_key.pem', {encoding: "utf8"});

    // para reconstruir el objeto de tipo key
    const public_key = crypto.createPublicKey(public_key_rep);

    /* callback function, el primer argumento representa un potencial error , 
    el segundo argumento representa el potencial payload del token.
    Aca se debería pasar la clave  */
    await jwt.verify(token, public_key, (err, validated) => {
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
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const filesystem = require('fs');
const crypto = require('crypto');

// se define al usuario en un doc en mongoDB
const UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
});

/* Se extiende userSchema agregando NUEVOS metodos */
UserSchema.methods.hashPassword = async (password) => {
    /* A salt is a random string. By hashing a plain text password plus
     a salt, the hash algorithm’s output is no longer predictable. The 
     same password will no longer yield the same hash. The salt gets 
     automatically included with the hash, so you do not need to store 
     it in a database.
     Hay que explicar en la parte teorica el concepto de salt */
    const salt = await bcrypt.genSalt(Number(process.env.salt));
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    
    // para obtener la representacion de la key privada
    const private_key_rep = filesystem.readFileSync('./keys/private_key.pem', {encoding: "utf8"});

    // para reconstruir el objeto de tipo key
    const private_key = crypto.createPrivateKey({key: private_key_rep});

    const token = jwt.sign(
        /* payload -> datos a cifrar entre el cliente y el server */
        {_id: this._id,
        email: this.email},

        private_key,

        { algorithm: 'RS256' },

        {expiresIn:'1d'}

    );
    
    return token;
};

// mongoose.model(<Collectionname>, <CollectionSchema>)
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
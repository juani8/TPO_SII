const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    const token = jwt.sign(
        /* payload -> datos a cifrar entre el cliente y el server */
        {_id: this._id,
        email: this.email},

        process.env.JWTKEY,

        {expiresIn:'1d'}

    );
    
    return token;
};

// mongoose.model(<Collectionname>, <CollectionSchema>)
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
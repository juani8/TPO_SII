const mongoose = require('mongoose');
require('dotenv').config();

// se importan las variables de entorno
const { mongodb_cs_host, mongodb_cs_database } = process.env;
// connection string
const mongodb_cs = `mongodb://${mongodb_cs_host}/${mongodb_cs_database}`;
// simplemente para solucionar DeprecationWarning
mongoose.set('strictQuery', false);

// exporta la informacion de la conexión
module.exports = async() => {
    // useNewUrlParser para que use el parcer mas actualizado
    // useUnifiedTopology topología mas eficiente
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    try {
        await mongoose.connect(mongodb_cs, connectionParams)
        console.log(`MongoDB '${mongodb_cs}' connected!`)
    } catch (err) {
        console.log(`Could not connect to DB: ${err}`)
    };
};
 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth_routes = require('../routes/auth_routes.js');

// se instancia el framework express
const app = express();


// BASE DE DATOS
// se importan las variables de entorno
const { mongodb_cs_host, mongodb_cs_database } = process.env;
// connection string
const mongodb_cs = `mongodb://${mongodb_cs_host}/${mongodb_cs_database}`;
// simplemente para solucionar DeprecationWarning
mongoose.set('strictQuery', false);

// exporta la informacion de la conexión
async function connection() {
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
// instancia la conexión a Mongo
connection();



// APLICACIÓN

// use json parser
app.use(express.json());

// cookie parser para leer cookies
app.use(cookieParser());

// comunicación con front-end (mediante la dependencia CORS)
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// implementar las rutas definidas en 'auth_routes'
app.use('/',auth_routes);

// se conecta la instancia de app a un puerto
async function init() {
    const port = process.env.port || 8080;
    app.listen(port, () => {
        console.log(`listening ${port}`)
    })
}


// instancia la app
init();

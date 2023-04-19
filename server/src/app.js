const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth_routes = require('../routes/auth_routes.js');

// se instancia la app
const app = express();
// use json parser
app.use(express.json());
// cookie parser para leer cookies
app.use(cookieParser());



// comunicación con front-end
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));


app.use('/',auth_routes);


module.exports = app;
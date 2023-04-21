require('dotenv').config();
const connection = require('./db');
const app = require('./app');

// instancia la conexión a Mongo
connection();

async function init() {
    const port = process.env.port || 8080;
    app.listen(port, () => {
        console.log(`listening ${port}`)
    })
}

// instancia la conexión al servidor
init();

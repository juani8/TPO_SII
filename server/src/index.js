require("dotenv").config();
const connection = require("./db");
const app = require("./app");


connection();

async function init() {
    const port = process.env.port || 8080;
    app.listen(port, () => {
        console.log(`listening ${port}`)
    })
}

init();

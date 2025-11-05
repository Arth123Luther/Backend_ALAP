const { MongoClient } = require("mongodb");

const url = `mongodb+srv://<userTarefas>:<1234abcd>@clustertruck.pzpuz7db.mongodb.net/`
const client = new MongoClient(url);

let db = null;

async function conectarDb() {
    try {
        if (db == null) {
            await client.connect();
            db = client.db("agenda");
        }
        console.log("MongoDB está Conectado!");
        return db;
    } catch (e) {
        console.log("MongoDB não pode conectar", e.message);
    }
}

module.exports = conectarDb;
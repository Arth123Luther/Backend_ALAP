// importar cliente do mongodb
const { MongoClient } = require('mongodb');

// string de conexao
const url = "mongodb+srv://<user>:<password>@clustertruck.pzpuz7x.mongodb.net/";

const client = new MongoClient(url);

async function conectar() {
    try {
        await client.connect();
        console.log("Conectado");
        return client.db('agenda');
    } catch(e) {
        console.log("Error ao conectar no MongoDB", e.message);
    }
};

module.exports = conectar;
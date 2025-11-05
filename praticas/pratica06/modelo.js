const conectarDb = require('./database');

class Tarefa {
    db = null;
    collection = null;

    id = null;
    nome = null;
    concluida = false;

    constructor(nome, concluida) {
        this.nome = nome;
        this.concluida = concluida;
    }

    async init() {
        this.db = await conectarDb();
        this.collection = this.db.collection("tarefas");
    }

    async inserir() {
        const resultado = await this.collection.insertOne({nome: this.nome, concluida: this.concluida});
        this.id = resultado.insertedId;
    }

    async alterar() {
        await this.collection.updateOne({_id: this.id}, { $set: { nome: this.nome, concluida: this.concluida }});
    }

    async deletar() {
        await this.collection.deleteOne({nome: this.nome});
    }

    async buscar() {
        const resultado = await this.collection.findOne({nome: this.nome});
        this.id = resultado._id;
        this.nome = resultado.nome;
        this.concluida = resultado.concluida;
    }
}

module.exports = Tarefa;
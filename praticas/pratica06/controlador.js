const Tarefa = require('./modelo.js');

async function adicionarTarefa(nome) {
    const tarefa = new Tarefa(nome, false);
    await tarefa.init();
    await tarefa.inserir();
}

async function buscarTarefa(nome) {
    const tarefa = new Tarefa(nome, null);
    await tarefa.init();
    await tarefa.inserir();
    return tarefa;
}

async function atualizarTarefa(nome, concluida) {
    const tarefa = new Tarefa(nome, null);
    await tarefa.init();
    await tarefa.buscar();
    
    if (tarefa.id !== null) {
        tarefa.concluida = concluida;
        await tarefa.alterar
    }
}

async function removerTarefa(nome) {
    const tarefa = new Tarefa(nome, null);
    await tarefa.init();
    await tarefa.buscar();

    if (tarefa.id !== null) {
        await tarefa.deletar();
    }
}

module.exports = { adicionarTarefa, buscarTarefa, atualizarTarefa, removerTarefa };
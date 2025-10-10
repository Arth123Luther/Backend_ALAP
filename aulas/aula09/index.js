const Tarefa = require('./modelo');

async function main() {
    let tarefa = new Tarefa("Estudar");
await tarefa.init();

await tarefa.inserir();
    console.log(
        "Tarefa criada com sucesso", 
        tarefa.id, 
        tarefa.nome, 
        tarefa.concluida
    );

tarefa = new Tarefa("Estudar")
await tarefa.init();

    tarefa.nome = "Trabalhar";
    tarefa.concluida = true;
await tarefa.alterar();
    console.log(
        "Tarefa alterada com sucesso", 
        tarefa.id, 
        tarefa.nome, 
        tarefa.concluida
    );

await tarefa.remover();
    console.log(
        "Tarefa removida com sucesso",
        tarefa.id,
        tarefa.nome,
        tarefa.concluida
    );
}

main();
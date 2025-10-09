const readline = require("readline-sync");
const conectar = require("./database");

let db;
let collection;
        
async function inserir(nomeTarefa) {
    const resultado = await collection.insertOne({nome: nomeTarefa, concluida: false});
    console.log("Tarefa criada com sucesso", resultado);
};

async function buscar(nomeTarefa) {
    const resultado = await collection.findOne({nome: nomeTarefa});
    console.log(resultado);
};

async function alterar(nomeTarefa, nomeAtual, concluidaAtual) {
    const resultado = await collection.updateOne({nome: nomeTarefa}, {$set: {nome: nomeAtual, concluida: concluidaAtual}});
    console.log("Tarefa alterada com sucesso", resultado);
};

async function remover(nomeTarefa) {
    const resultado = await collection.deleteOne({nome: nomeTarefa});
    console.log(resultado);
};

async function main() {
    db = await conectar();
    collection = db.collection("tarefas");
    
    while(true) {
        console.log("MENU PRINCIPAL");
        console.log("1 - Criar Tarefa");
        console.log("2 - Buscar tarefa");
        console.log("3 - Alterar tarefa");
        console.log("4 - Remover tarefa");
        console.log("5 - Sair");
    
        const opcao = readline.question("Escolha uma opcao: ");

        switch(opcao) {
            case '1': {
                console.log("Selecionado: Criar Tarefa")
                const nome = readline.question("Informe o nome da tarefa: ");
                await inserir(nome);
                break;
            };
            case '2': {
                console.log("Selecionado: Buscar Tarefa")
                const nome = readline.question("Informe o nome da tarefa: ");
                await buscar(nome);
                break;
            };
            case '3': {
                console.log("Selecionado: Alterar Tarefa");
                const nome = readline.question("Informe o nome da tarefa: ");
                const nomeAtual = readline.question("Informe outro nome para a tarefa: ");
                const concluidaAtual = readline.question("Informe a situação da tarefa: ");
                await alterar(nome, nomeAtual, concluidaAtual);
                break
            };
            case '4': {
                console.log("Selecionado: Remover Tarefa");
                const nome = readline.question("Informe o nome da tarefa: ");
                await remover(nome);
                break;
            }
            case '5': process.exit(0);
            default: console.log("Opção Invalida.");
        };
    };
};

main();
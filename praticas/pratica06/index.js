const readline = require("readline-sync");
const controlador = require("./controlador.js");

function menu() {
    console.log("1 - Adicionar contato");
    console.log("2 - Buscar contato");
    console.log("3 - Atualizar contato");
    console.log("4 - Remover contato");
    console.log("5 - Sair");
}

function escolherOpcao() {
    const opcao = readline.questionInt("Escolha uma opção: ");
    switch (opcao) {
        case "1":
            console.log("Opção 1 selecionada - Adicionar contato");
            controlador.adicionarTarefa;
            break;
        case "2":
            console.log("Opção 2 selecionada - Buscar contato");
            controlador.buscarTarefa;
            break;
        case "3":
            console.log("Opção 3 selecionada - Atualizar contato");
            controlador.atualizarTarefa;
            break;
        case "4":
            console.log("Opção 4 selecionada - Remover contato");
            controlador.removerTarefa;
            break;
        case "5":
            console.log("Opção 5 selecionada - Sair");
            break;
        default:
            console.log("Opção inválida. Tente novamente.");
            escolherOpcao();
    }
}
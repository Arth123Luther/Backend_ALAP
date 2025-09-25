const tarefas = [];

const listar = () => {
    return tarefas;
};

const criar = (dados) => {
    const novaTarefa = {
    ...dados,
    id: tarefas.length + 1,
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
};

const pesquisarId = (id) => {
  const tarefaEncontrada = tarefas.find((item) => item.id === parseInt(id));
  return tarefaEncontrada;
};

const alterar = (tarefa) => {
  const tarefaEncontrada = tarefas.find((item) => item.id === parseInt(tarefa.id));
  if (tarefaEncontrada) {
    tarefaEncontrada.nome = tarefa.nome;
    tarefaEncontrada.concluida = tarefa.concluida;
  }
  return tarefaEncontrada;
};

const excluir = (id) => {
  const posicao = tarefas.findIndex((item) => item.id === parseInt(id));
  if (posicao >= 0) {
    tarefas.splice(posicao, 1);
  }
  return posicao;
};

module.exports = { criar, listar, pesquisarId, alterar, excluir };
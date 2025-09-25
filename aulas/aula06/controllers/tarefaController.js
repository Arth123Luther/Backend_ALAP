const model = require("../models/tarefaModel");
const listarTarefas = (req, res) => {
  const tarefas = model.listar();
  res.json(tarefas);
};

const criarTarefa = (req, res) => {
  const novaTarefa = model.criar(req.body);
  res.status(201).json(novaTarefa);
};

const pesquisarId = (req, res, next) => {
  const { id } = req.params;
  const tarefaEncontrada = model.pesquisarId(id);
  if (tarefaEncontrada) {
    req.tarefa = tarefaEncontrada;
    return next();
  };
    res.status(404).json({ msg: "Tarefa não encontrada" });
};

const exibirTarefa = (req, res) => {
  res.json(req.tarefa);
}

const alterarTarefa = (req, res) => {
  const { id } = req.params;
  const tarefaEncontrada = model.alterar({id, ...req.body});
  return res.json(tarefaEncontrada);
};

const apagarTarefa = (req, res) => {
  const { id } = req.params;
  model.excluir(id);
  return res.status(204).end();
};

module.exports = {
  listarTarefas,
  criarTarefa,
  pesquisarId,
  alterarTarefa,
  apagarTarefa,
  exibirTarefa,
};

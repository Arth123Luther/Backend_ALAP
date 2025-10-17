const Tarefa = require('../models/tarefasModel');

async function criar(req,res) {
    const novaTarefa = await Tarefa.create({
        nome: req.body.nome,
        concluida: false
    })
    return res.status(201).json({
        id: novaTarefa._id,
        nome: novaTarefa.nome,
        concluida: novaTarefa.concluida
    });
}

async function listar(req,res) {
    const tarefas = await Tarefa.find({});
    return res.json(tarefas);
}

async function buscar(req,res,next) {
    const { id } = req.params;
    const tarefaEncontrada = await Tarefa.findOne({ _id: id });
    if (tarefaEncontrada) {
        req.tarefaEncontrada = {
            id: tarefaEncontrada._id,
            nome: tarefaEncontrada.nome,
            concluida: tarefaEncontrada.concluida,
        };
        return next();
    }
   return res.status(404).json({ msg: "Tarefa Não Encontrada" });
}

function exibir(req,res) {
    return res.json({ id: 1 });
}

async function atualizar(req,res) {
    const { id } = req.params;
    const tarefaAtualizada = await Tarefa.findOneAndUpdate(
        { _id: id },
        { ...req.body }
    );
    return res.json({
        id: tarefaAtualizada._id,
        nome: tarefaAtualizada.nome,
        concluida: tarefaAtualizada.concluida,
    });
}

async function remover(req,res) {
    const { id } = req.params;
    const tarefaAtualizada = await Tarefa.findOneAndDelete({ _id: id });
    return res.status(204).end();
}

module.exports = { criar, listar, buscar, exibir, atualizar, remover }
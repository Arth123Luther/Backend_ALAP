const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

const criar = async (req, res) => {
    try {
        const { nome, preco } = req.body;
        const novoProduto = await Produto.create({ nome, preco });
        return res.status(201).json(novoProduto);
    } catch (error) {
        return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios"});
    }
};

const listar = async (req, res) => {
  const produtosCadastrados = await Produto.find({});
  return res.status(200).json(produtosCadastrados);
};

const buscar = async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }
  
  const produtoEncontrado = await Produto.findOne({ _id: id });
  
  if (produtoEncontrado) {
    req.produto = produtoEncontrado;
    return next();
  } else {
    return res.status(404).json({ msg: "Produto não encontrado" });
  };
};

const exibir = async (req, res) => {
    return res.status(200).json(req.produto);
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;
    
    if (!nome || !preco) {
      return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }
    await Produto.findOneAndUpdate(
      { _id: id },
      { nome, preco },
      { new: true, runValidators: true }
    );
    
    const produtoAtualizado = {
      _id: id,
      nome,
      preco
    };
    
    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
};

const remover = async (req, res) => {
    const { id } = req.params;
    const produtoRemovido = await Produto.findOneAndDelete({ _id: id });
    return res.status(204).send();
};

module.exports = { criar, listar, buscar, exibir, atualizar, remover };
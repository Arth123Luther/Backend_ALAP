function criar(req,res) {
    return res.status(201).json({ id:1 });
}

function listar(req,res) {
    return res.json([]);
}

function buscar(req,res,next) {
    next();
}

function exibir(req,res) {
    return res.json({ id: 1 });
}

function atualizar(req,res) {
    return res.json({ id: 1 });
}

function remover(req,res) {
    return res.status(204).end();
}

module.exports = { criar, listar, buscar, exibir, atualizar, remover }
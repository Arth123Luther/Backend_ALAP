const { cifrarSenha, compararSenha, gerarToken } = require('../middlewares/authMiddleware');
const Usuario = require('../models/usuariosModel');

async function criar(req, res) {
    try {
        if (!req.body.email || !req.body.senha) {
            return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
        }
        const senhaCifrada = cifrarSenha(req.body.senha);
        const novoUsuario = await Usuario.create({
            email: req.body.email,
            senha: senhaCifrada,
        });
        return res.status(201).json({
            _id: novoUsuario._id,
            email: novoUsuario.email
        });
    } catch (err) {
        return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
}

async function entrar(req, res) {
    try {
        const email = req.body.email || req.body.usuario;
        const usuarioEncontrado = await Usuario.findOne({ email });
        
        if (usuarioEncontrado && compararSenha(req.body.senha, usuarioEncontrado.senha)) {
            const token = gerarToken({ email });
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }
    } catch (err) {
        return res.status(401).json({ msg: "Credenciais inválidas" });
    }
}

async function renovar(req, res) {
    try {
        const token = gerarToken({ email: req.usuario.email });
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(401).json({ msg: "Token inválido" });
    }
}

async function remover(req, res) {
    try {
        await Usuario.findOneAndDelete({ _id: req.params.id });
        return res.status(204).send();
    } catch (err) {
        return res.status(401).json({ msg: "Não foi possível remover" });
    }
}

module.exports = { criar, entrar, renovar, remover };

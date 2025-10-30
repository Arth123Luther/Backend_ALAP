const jwt = require('jsonwebtoken');

function gerarToken(payload) {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    } catch(err) {
        throw Error("Erro ao gerar um token");
    }
}

function verificarToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        const payload = jwt.verify(authorization, process.env.JWT_SECRET);
        req.payload = payload;
        return next();
    } catch(err){
        throw res.status(401).json({msg: "Token invalido"});
    }
}

module.exports = { gerarToken, verificarToken }
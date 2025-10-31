const jwt = require('jsonwebtoken');

function gerarToken(payload) {
    try {
        const expiresIn = 60;
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    } catch(err) {
        throw Error("Erro ao gerar um token");
    }
}

function verificarToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = payload;
        return next();
    } catch(err){
        throw res.status(401).json({msg: "Token invalido"});
    }
}

module.exports = { gerarToken, verificarToken }